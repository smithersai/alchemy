#!/usr/bin/env node
// Removes the `mutable` modifier from interface and type-literal members in .vibe files.
//
// There it does nothing: a member is writable unless written `readonly`, and the emitted JavaScript
// and declarations are the same with or without it. The migration's first converter wrote it on every
// such member. `data`, `schema` and `error` bodies are left alone: there `mutable` changes the emitted
// payload text (VIP-13) or the schema's writability (VIP-15).
//
// Usage, from the repository root, after any conversion pass:
//   node .vibelang/strip-noop-mutable.mjs [--check] [--compiler <native vibelang>] [<tree>]
//
// An explicit <tree> is honored with or without --compiler.
// --check reports the plan and writes nothing. It selects by the compiler's own syntax tree, so a member
// or identifier named `mutable`, a string and a comment are never touched. It removes the modifier and
// the one space or tab after it, and nothing else, then parses the result again before writing.
// Prove each pass: the emitted .js, .d.ts and .d.vibe.ts of every changed project stay byte-identical.
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const SKIP = new Set([
  ".git",
  ".jj",
  "node_modules",
  "submodules",
  "dist",
  "build",
  "lib",
  "coverage",
  ".cache",
]);

const parse = (compiler, text, name) => {
  const result = spawnSync(compiler, ["--estree", name], {
    input: text,
    encoding: "utf8",
    maxBuffer: 2 ** 30,
  });
  const response = result.status === 0 ? JSON.parse(result.stdout) : undefined;
  if (!response?.ast?.tokens)
    throw new Error(`cannot parse ${name}: ${result.stderr}${result.stdout}`);
  return response.ast;
};

export const editsFor = (compiler, text, name) => {
  if (!text.includes("mutable")) return [];
  const ast = parse(compiler, text, name);
  const { tokens } = ast;
  const firstAt = (position) => {
    let low = 0;
    let high = tokens.length;
    while (low < high) {
      const middle = (low + high) >>> 1;
      if (tokens[middle].range[0] < position) low = middle + 1;
      else high = middle;
    }
    return low;
  };
  const edits = [];
  const isCustomBody = (node) => {
    if (!["ClassDeclaration", "ClassExpression", "VariableDeclaration"].includes(node.type))
      return false;
    let index = firstAt(node.range[0]);
    while (["export", "default", "declare", "abstract"].includes(tokens[index]?.value)) index += 1;
    return ["data", "schema", "error"].includes(tokens[index]?.value);
  };
  const visit = (node, parent, inCustomBody) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      for (const item of node) visit(item, parent, inCustomBody);
      return;
    }
    const custom = inCustomBody || isCustomBody(node);
    const isMember = node.type === "TSPropertySignature" || node.type === "TSIndexSignature";
    if (!custom && isMember && ["TSInterfaceBody", "TSTypeLiteral"].includes(parent?.type)) {
      const end = node.key?.range[0] ?? node.parameters?.[0]?.range[0] ?? node.range[1];
      const head = tokens.slice(firstAt(node.range[0]), firstAt(end));
      const bracket = head.findIndex((token) => token.value === "[");
      head.forEach((token, index) => {
        if (token.type !== "Identifier" || token.value !== "mutable") return;
        // An index signature's parameter may itself be named mutable; its modifier comes first.
        if (node.type === "TSIndexSignature" && (bracket < 0 || index > bracket)) return;
        const [start, stop] = token.range;
        edits.push({ start, end: stop + (/^[ \t]/.test(text.slice(stop)) ? 1 : 0) });
      });
    }
    for (const [key, value] of Object.entries(node)) {
      if (
        !["tokens", "comments", "range", "loc"].includes(key) &&
        value &&
        typeof value === "object"
      ) {
        visit(value, node, custom);
      }
    }
  };
  visit(ast, null, false);
  return edits.sort((a, b) => b.start - a.start);
};

export const strip = (text, edits) =>
  edits.reduce((result, edit) => result.slice(0, edit.start) + result.slice(edit.end), text);

const vibeFiles = (root, directory = "") =>
  readdirSync(join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = directory ? `${directory}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return SKIP.has(entry.name) ? [] : vibeFiles(root, path);
    return entry.isFile() && path.endsWith(".vibe") ? [path] : [];
  });

const main = (argv) => {
  const check = argv.includes("--check");
  const at = argv.indexOf("--compiler");
  const compilerArg = at < 0 ? undefined : argv[at + 1];
  const rest = argv.filter(
    (arg, index) => arg !== "--check" && (at < 0 || (index !== at && index !== at + 1)),
  );
  const root = resolve(rest[0] ?? ".");
  const compiler = resolve(compilerArg ?? join(root, "node_modules/vibelang/native/vibelang"));
  if (!existsSync(compiler)) throw new Error(`no compiler at ${compiler}; pass --compiler`);
  let sites = 0;
  let files = 0;
  for (const path of vibeFiles(root)) {
    const text = readFileSync(join(root, path), "utf8");
    const edits = editsFor(compiler, text, path);
    if (edits.length === 0) continue;
    const next = strip(text, edits);
    parse(compiler, next, path);
    sites += edits.length;
    files += 1;
    if (!check) writeFileSync(join(root, path), next);
  }
  console.log(`${check ? "would remove" : "removed"} ${sites} mutable modifiers in ${files} files`);
};

if (process.argv[1] && resolve(process.argv[1]) === import.meta.filename)
  main(process.argv.slice(2));
