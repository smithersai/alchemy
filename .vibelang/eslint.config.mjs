import { existsSync, readFileSync } from "node:fs";
import parser from "vibelang/eslint";
// The repository's Oxlint configuration, read on each run: its rules and its
// overrides (a *.ts glob read as *.vibe) apply to .vibe files wherever ESLint,
// typescript-eslint or one of the configuration's JS plugins has the rule.
// typescript-eslint's recommended rules stand in for Oxlint's default
// correctness rules unless the configuration turns that category off. Rules of
// Oxlint's other built-in plugins, such as unicorn, are not carried.
const read = (name) => {
  const url = new URL("../" + name, import.meta.url);
  return existsSync(url) ? readFileSync(url, "utf8") : null;
};
const text = read(".oxlintrc.json") ?? read(".oxlintrc.jsonc");
const oxlint = text
  ? JSON.parse(
      text
        .replace(/("(?:\\.|[^"\\])*")|\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, (all, string) => string ?? "")
        .replace(/,(\s*[}\]])/g, "$1"),
    )
  : {};
// An Oxlint JS plugin is an ESLint plugin. Each loads as Oxlint loads it: a
// path from the configuration's directory, else a package, named by its alias,
// else by its meta.name or package name less an eslint-plugin or oxlint-plugin
// prefix. Its rules read a .vibe file's source tree as they read a .ts file's.
const pluginName = (name, specifier) => {
  if (typeof name !== "string")
    throw new Error(
      specifier +
        ": Oxlint names a JS plugin by its alias, its meta.name or its package name, and this one has none",
    );
  const slash = name.indexOf("/");
  const scope = slash === -1 ? "" : name.slice(0, slash + 1);
  const rest = name.slice(scope.length);
  for (const prefix of ["eslint-plugin", "oxlint-plugin"]) {
    if (scope && rest === prefix) return scope.slice(0, -1);
    if (rest.startsWith(prefix + "-")) return scope + rest.slice(prefix.length + 1);
  }
  return name;
};
// A rule written for Oxlint's createOnce API runs as Oxlint's
// eslintCompatPlugin runs it under ESLint: once per file.
const eslintRule = (rule) =>
  rule.create || !rule.createOnce
    ? rule
    : {
        ...rule,
        create(context) {
          const { before, after, ...visitor } = rule.createOnce(context);
          if (before && before() === false) return {};
          if (!after) return visitor;
          const exit = visitor["Program:exit"];
          return {
            ...visitor,
            "Program:exit"(node) {
              if (exit) exit(node);
              after();
            },
          };
        },
      };
const jsPlugins = new Map(
  await Promise.all(
    (oxlint.jsPlugins ?? []).map(async (entry) => {
      const { name, specifier } = typeof entry === "string" ? { specifier: entry } : entry;
      const local = /^(?:\.\.?)?\//.test(specifier);
      const module = await import(
        local ? new URL(specifier, new URL("../", import.meta.url)).href : specifier
      );
      const plugin = module.default ?? module;
      const packageName = local
        ? undefined
        : specifier
            .split("/")
            .slice(0, specifier.startsWith("@") ? 2 : 1)
            .join("/");
      const rules = Object.fromEntries(
        Object.entries(plugin.rules ?? {}).map(([rule, definition]) => [
          rule,
          eslintRule(definition),
        ]),
      );
      return [
        name ?? pluginName(plugin.meta?.name ?? packageName, specifier),
        { ...plugin, rules },
      ];
    }),
  ),
);
// typescript-eslint refuses TypeScript 7, so its rules join only where it loads.
const tseslint = await import("typescript-eslint").then(
  ({ default: loaded }) => loaded,
  () => null,
);
const core = await import("eslint/use-at-your-own-risk").then(
  ({ builtinRules }) => builtinRules,
  () => null,
);
const typed = new Set(Object.keys(tseslint?.plugin?.rules ?? {}));
const levels = {
  allow: "off",
  deny: "error",
  off: "off",
  warn: "warn",
  error: "error",
  0: "off",
  1: "warn",
  2: "error",
};
const rules = (settings = {}) =>
  Object.fromEntries(
    Object.entries(settings).flatMap(([name, setting]) => {
      const [level, ...options] = [setting].flat();
      const value = [levels[level] ?? level, ...options];
      const plugin = name.includes("/") ? name.slice(0, name.lastIndexOf("/")) : "";
      const rule = name.slice(name.lastIndexOf("/") + 1);
      // A core rule typescript-eslint extends for TypeScript, as Oxlint's does, is typescript-eslint's.
      if (
        plugin === "typescript" ||
        plugin === "@typescript-eslint" ||
        ((plugin === "" || plugin === "eslint") && typed.has(rule))
      )
        return typed.has(rule) ? [["@typescript-eslint/" + rule, value]] : [];
      if (plugin === "" || plugin === "eslint")
        return !core || core.has(rule) ? [[rule, value]] : [];
      return jsPlugins.get(plugin)?.rules[rule] ? [[name, value]] : [];
    }),
  );
const vibe = (glob) =>
  glob
    .replace(/\.\{([^}]*)\}$/, (all, list) =>
      list.split(",").some((e) => /^[cm]?tsx?$/.test(e.trim())) ? ".vibe" : all,
    )
    .replace(/\.[cm]?tsx?$/, ".vibe");
const overrides = (oxlint.overrides ?? [])
  .map((override) => ({
    files: [override.files]
      .flat()
      .filter((glob) => vibe(glob) !== glob)
      .map(vibe),
    rules: rules(override.rules),
  }))
  .filter((override) => override.files.length && Object.keys(override.rules).length);
const correctness = levels[oxlint.categories?.correctness] !== "off";
export default [
  { ignores: ["**/node_modules/**", "**/dist/**", "**/build/**"] },
  ...(correctness && tseslint
    ? tseslint.configs.recommended.map((config) => ({ ...config, files: ["**/*.vibe"] }))
    : []),
  {
    files: ["**/*.vibe"],
    languageOptions: { parser },
    plugins: {
      ...(tseslint ? { "@typescript-eslint": tseslint.plugin } : {}),
      ...Object.fromEntries(jsPlugins),
    },
    rules: { "no-debugger": "error", ...rules(oxlint.rules) },
  },
  ...overrides,
];
