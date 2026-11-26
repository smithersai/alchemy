import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire, stripTypeScriptTypes } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const compiler = process.env.VIBELANG_BINARY ?? join(root, "node_modules/vibelang/native/vibelang");
const testRequire = createRequire(
  new URL("../packages/alchemy-test/package.json", import.meta.url),
);
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
const cases = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-aws-source-urls.json", import.meta.url), "utf8"),
);

function initializer(file, name) {
  const source = readFileSync(join(root, file), "utf8");
  const result = spawnSync(compiler, ["--estree", file], {
    input: source,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  assert.equal(result.status, 0, result.stderr);
  let found;
  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (node.type === "VariableDeclarator" && node.id?.name === name) found = node.init;
    for (const [key, value] of Object.entries(node))
      if (!["tokens", "comments", "range", "loc"].includes(key)) {
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === "object") visit(value);
      }
  }
  visit(JSON.parse(result.stdout).ast);
  assert.ok(found, name);
  return { source, found };
}
const helper = initializer("packages/alchemy/src/Util/Node.ts", "moduleExtension");
const helperText = helper.source.slice(...helper.found.range);
const expressions = cases.map((entry) => {
  const { source, found } = initializer(entry.file, entry.export);
  let body = found.body;
  if (entry.property) {
    const object = body.arguments.find((node) => node.type === "ObjectExpression");
    body = object.properties.find((p) => (p.key?.name ?? p.key?.value) === entry.property).value;
  }
  return source.slice(...body.range);
});

function resolves({
  entry,
  callerSuffix = "ts",
  targetSuffix = "vibe",
  query = false,
  name = "package",
}) {
  const temp = mkdtempSync(join(tmpdir(), "alchemy-aws-uri-"));
  try {
    const project = join(temp, name),
      directory = join(project, "src", entry.directory);
    mkdirSync(directory, { recursive: true });
    const target = "src/" + entry.directory + "/" + entry.target + "." + targetSuffix;
    writeFileSync(
      join(project, "package.json"),
      JSON.stringify({
        name: "@alchemy.run/aws",
        type: "module",
        exports: { [entry.subpath]: "./" + target },
      }),
    );
    writeFileSync(join(project, target), "");
    const caller = join(directory, "caller." + callerSuffix);
    const expression = expressions[cases.findIndex((c) => c.id === entry.id)];
    const source =
      'import { existsSync } from "node:fs"; import { fileURLToPath } from "node:url";\n' +
      "const moduleExtension = " +
      helperText +
      ";\n" +
      "const target = " +
      expression +
      ";\n" +
      "console.log(JSON.stringify({ exists: existsSync(fileURLToPath(target)) }));\n";
    const output = stripTypeScriptTypes(source);
    writeFileSync(caller, output);
    const url = pathToFileURL(caller).href + (query ? "?dev-loader=1" : "");
    const runner = join(project, "run.mjs");
    writeFileSync(runner, "await import(" + JSON.stringify(url) + ");\n");
    const result = spawnSync(process.execPath, [runner], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(
      JSON.parse(result.stdout).exists,
      true,
      entry.id + ": returned URL must name the real target",
    );
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

for (const entry of cases)
  void test(entry.id + ": a TypeScript caller resolves its converted sibling", () =>
    resolves({ entry }),
  );
void test("ordinary TypeScript and emitted JavaScript siblings remain resolvable", () => {
  for (const entry of cases)
    for (const suffix of ["ts", "js"])
      resolves({ entry, callerSuffix: suffix, targetSuffix: suffix, query: true });
});
void test("AWS source URL property preserves real targets across extensions and loader queries", () => {
  fc.assert(
    fc.property(
      fc.record({
        entry: fc.constantFrom(...cases),
        callerSuffix: fc.constantFrom("ts", "js"),
        targetSuffix: fc.constantFrom("ts", "js", "vibe"),
        query: fc.boolean(),
        name: fc.constantFrom("package", "package with spaces", "quoted ' package", "unicode λ"),
      }),
      resolves,
    ),
    { seed: 561104, numRuns: 40 },
  );
});
