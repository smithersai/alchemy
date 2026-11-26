import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const compiler = join(root, "node_modules/vibelang/native/vibelang");
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-bootstrap-templates.json", import.meta.url), "utf8"),
);
function initializers(file) {
  const source = readFileSync(join(root, file), "utf8");
  const result = spawnSync(compiler, ["--estree", file], {
    input: source,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  assert.equal(result.status, 0, result.stderr);
  const values = new Map();
  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (node.type === "VariableDeclarator" && node.id?.name) values.set(node.id.name, node.init);
    for (const [key, value] of Object.entries(node))
      if (!["range", "loc", "tokens", "comments"].includes(key)) {
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === "object") visit(value);
      }
  }
  visit(JSON.parse(result.stdout).ast);
  return { source, values };
}
const factories = corpus.map((entry) => {
  const { values } = initializers(entry.file);
  const body = values.get(entry.factory)?.body?.body;
  assert.equal(body?.type, "TemplateLiteral", entry.factory);
  const entryPoint = values.get("FUNCTION_ENTRY_POINT")?.value;
  return (handler, importPath) => {
    const context = { handler, importPath, FUNCTION_ENTRY_POINT: entryPoint };
    const expression = (node) => {
      if (node.type === "Identifier" && Object.hasOwn(context, node.name))
        return context[node.name];
      assert.equal(node.type, "CallExpression");
      assert.equal(node.callee.object?.name, "JSON");
      assert.equal(node.callee.property?.name, "stringify");
      assert.equal(node.arguments.length, 1);
      return JSON.stringify(expression(node.arguments[0]));
    };
    return body.quasis
      .map(
        (part, i) =>
          part.value.cooked + (i < body.expressions.length ? expression(body.expressions[i]) : ""),
      )
      .join("");
  };
});
function executes({ index, handler = "Handler", name = "entry" }) {
  const entry = corpus[index],
    temp = mkdtempSync(join(tmpdir(), "alchemy-template-"));
  try {
    writeFileSync(
      join(temp, "package.json"),
      JSON.stringify({
        name: entry.package,
        type: "module",
        exports: { [entry.subpath]: "./bootstrap.mjs" },
      }),
    );
    writeFileSync(
      join(temp, "bootstrap.mjs"),
      entry.id === "docker"
        ? 'export async function bootstrap(entry) { if (entry.kind !== "entry") throw new Error("bad entry"); console.log("bootstrapped"); }'
        : 'export function makeHandler(entry) { if (entry.kind !== "entry") throw new Error("bad entry"); return { kind: "bootstrapped" }; }',
    );
    const input = join(temp, name + ".mjs");
    writeFileSync(input, "export const " + handler + ' = { kind: "entry" };');
    writeFileSync(
      join(temp, "generated.mjs"),
      factories[index](handler, pathToFileURL(input).href),
    );
    const runner = join(temp, "run.mjs");
    writeFileSync(
      runner,
      entry.id === "docker"
        ? 'await import("./generated.mjs");'
        : 'const result = await import("./generated.mjs"); console.log(result.handler.kind);',
    );
    const result = spawnSync(process.execPath, [runner], { encoding: "utf8" });
    assert.equal(result.status, 0, entry.id + ": " + result.stderr);
    assert.equal(result.stdout.trim(), "bootstrapped");
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}
for (const [index, entry] of corpus.entries())
  void test(entry.id + " generated entry imports its bootstrap binding", () => executes({ index }));
void test("bootstrap templates execute across handler names and quoted module URLs", () => {
  fc.assert(
    fc.property(
      fc.record({
        index: fc.integer({ min: 0, max: corpus.length - 1 }),
        handler: fc.constantFrom("Handler", "_handler", "$handler", "handlerλ"),
        name: fc.constantFrom("entry", "entry with spaces", "quoted ' entry", "unicode λ"),
      }),
      executes,
    ),
    { seed: 561107, numRuns: 40 },
  );
});
