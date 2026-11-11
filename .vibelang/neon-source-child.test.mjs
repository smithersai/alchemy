import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-neon-source-child.json", import.meta.url), "utf8"),
);
const expressions = corpus.map((entry) => {
  const source = readFileSync(join(root, entry.file), "utf8");
  const result = spawnSync(
    join(root, "node_modules/vibelang/native/vibelang"),
    ["--estree", entry.file],
    { input: source, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
  );
  assert.equal(result.status, 0, result.stderr);
  let found;
  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (
      node.type === "NewExpression" &&
      node.callee?.name === "URL" &&
      source.slice(...(node.arguments[1]?.range ?? [0, 0])) === "import.meta.url"
    )
      found = node.arguments[0];
    for (const [key, value] of Object.entries(node))
      if (!["range", "loc", "tokens", "comments"].includes(key)) {
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === "object") visit(value);
      }
  }
  visit(JSON.parse(result.stdout).ast);
  assert.ok(found, entry.file);
  return source.slice(...found.range).replaceAll("import.meta.url", "callerUrl");
});
function resolves({ index, suffix = "vibe", query = false, hash = false, name = "caller" }) {
  const temp = mkdtempSync(join(tmpdir(), "alchemy-neon-child-"));
  try {
    const target = join(temp, corpus[index].target + (suffix === "js" ? ".js" : ".ts"));
    writeFileSync(target, "");
    const callerUrl =
      pathToFileURL(join(temp, name + "." + suffix)).href +
      (query ? "?loader=1" : "") +
      (hash ? "#watch" : "");
    const runner = join(temp, "run.mjs");
    writeFileSync(
      runner,
      'import { existsSync } from "node:fs"; import { fileURLToPath } from "node:url";\n' +
        "const callerUrl = " +
        JSON.stringify(callerUrl) +
        ";\n" +
        "const target = new URL(" +
        expressions[index] +
        ", callerUrl);\n" +
        "console.log(JSON.stringify({ path: fileURLToPath(target), exists: existsSync(fileURLToPath(target)) }));",
    );
    const result = spawnSync(process.execPath, [runner], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    const actual = JSON.parse(result.stdout);
    assert.equal(actual.path, target);
    assert.equal(actual.exists, true);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}
void test("migrated callers select the TypeScript source child", () => {
  for (const index of [0, 1]) resolves({ index });
});
void test("emitted JavaScript callers retain their JavaScript child with loader metadata", () => {
  for (const index of [0, 1]) resolves({ index, suffix: "js", query: true, hash: true });
});
void test("source-child paths survive source extensions and loader query/hash combinations", () => {
  fc.assert(
    fc.property(
      fc.record({
        index: fc.integer({ min: 0, max: corpus.length - 1 }),
        suffix: fc.constantFrom("ts", "vibe", "js"),
        query: fc.boolean(),
        hash: fc.boolean(),
        name: fc.constantFrom("caller", "caller with spaces", "quoted ' caller", "unicode λ"),
      }),
      resolves,
    ),
    { seed: 561109, numRuns: 40 },
  );
});
