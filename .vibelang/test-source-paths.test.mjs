import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-test-source-paths.json", import.meta.url), "utf8"),
);
const locators = corpus.map((entry) => {
  const source = readFileSync(join(root, entry.test), "utf8");
  const parsed = spawnSync(
    join(root, "node_modules/vibelang/native/vibelang"),
    ["--estree", entry.test],
    { input: source, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
  );
  assert.equal(parsed.status, 0, parsed.stderr);
  const values = new Map();
  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (node.type === "VariableDeclarator" && entry.bindings.includes(node.id?.name))
      values.set(node.id.name, node.init);
    for (const [key, value] of Object.entries(node))
      if (!["range", "loc", "tokens", "comments"].includes(key)) {
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === "object") visit(value);
      }
  }
  visit(JSON.parse(parsed.stdout).ast);
  if (entry.kind === "path")
    return (
      entry.bindings
        .map((name) => {
          const node = values.get(name);
          assert.ok(node, name);
          return (
            "const " +
            name +
            " = " +
            source.slice(...node.range).replaceAll("import.meta.dirname", "testDirectory") +
            ";\n"
          );
        })
        .join("") +
      "const pinnedPath = " +
      entry.result +
      ";\n"
    );
  let url;
  function find(node) {
    if (!node || typeof node !== "object") return;
    if (node.type === "NewExpression" && node.callee?.name === "URL") url = node;
    for (const [key, value] of Object.entries(node))
      if (!["range", "loc", "tokens", "comments"].includes(key)) {
        if (Array.isArray(value)) value.forEach(find);
        else if (value && typeof value === "object") find(value);
      }
  }
  find(values.get(entry.result));
  assert.ok(url, entry.result);
  return (
    "const pinnedPath = fileURLToPath(" +
    source.slice(...url.range).replaceAll("import.meta.url", "testUrl") +
    ");\n"
  );
});
function reads({ index, workspace = root, query = false }) {
  const temp = mkdtempSync(join(tmpdir(), "alchemy-test-path-probe-"));
  try {
    const entry = corpus[index],
      testFile = join(workspace, entry.test);
    const probe = join(temp, "probe.mjs");
    writeFileSync(
      probe,
      'import * as fs from "node:fs"; import * as path from "node:path"; import { fileURLToPath } from "node:url";\n' +
        "const testDirectory = " +
        JSON.stringify(dirname(testFile)) +
        ";\n" +
        "const testUrl = " +
        JSON.stringify(pathToFileURL(testFile).href + (query ? "?loader=1" : "")) +
        ";\n" +
        locators[index] +
        "const result = { path: pinnedPath }; try { result.bytes = fs.readFileSync(pinnedPath).length; result.ok = true; } catch (error) { result.ok = false; result.code = error.code; }\nconsole.log(JSON.stringify(result));",
    );
    const result = spawnSync(process.execPath, [probe], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    const actual = JSON.parse(result.stdout);
    assert.equal(actual.path, join(workspace, entry.source));
    return actual;
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}
for (const [index, entry] of corpus.entries())
  void test(entry.id + ": the unedited test's actual source read remains available", () => {
    const actual = reads({ index });
    assert.equal(actual.ok, true, entry.source + ": " + actual.code);
  });
void test("pinned source reads expose the known rename gap across path and loader states", () => {
  fc.assert(
    fc.property(
      fc.record({
        index: fc.integer({ min: 0, max: corpus.length - 1 }),
        renamed: fc.boolean(),
        query: fc.boolean(),
        name: fc.constantFrom("repo", "repo with spaces", "quoted ' repo", "unicode λ"),
      }),
      ({ index, renamed, query, name }) => {
        const temp = mkdtempSync(join(tmpdir(), "alchemy-pinned-source-"));
        try {
          const workspace = join(temp, name),
            source = join(workspace, corpus[index].source);
          mkdirSync(dirname(source), { recursive: true });
          writeFileSync(renamed ? source.replace(/\.ts$/, ".vibe") : source, "pinned");
          const result = reads({ index, workspace, query });
          assert.equal(result.ok, !renamed);
          if (renamed) assert.equal(result.code, "ENOENT");
        } finally {
          rmSync(temp, { recursive: true, force: true });
        }
      },
    ),
    { seed: 561114, numRuns: 40 },
  );
});
