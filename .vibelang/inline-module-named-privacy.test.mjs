import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire, stripTypeScriptTypes } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../scripts/package-build.ts", import.meta.url));
const testRequire = createRequire(
  new URL("../packages/alchemy-test/package.json", import.meta.url),
);
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(
    new URL("./corpus/alchemy-inline-module-named-privacy.json", import.meta.url),
    "utf8",
  ),
);
const temp = mkdtempSync(join(tmpdir(), "alchemy-inline-module-"));
after(() => rmSync(temp, { recursive: true, force: true }));
symlinkSync(join(root, "scripts/node_modules"), join(temp, "node_modules"), "dir");
writeFileSync(
  join(temp, "builder.mjs"),
  stripTypeScriptTypes(
    readFileSync(
      process.env.ALCHEMY_NAMED_BUILD_SOURCE ?? join(root, "scripts/package-build.ts"),
      "utf8",
    ),
  ) + "\nexport { syncPublishExports };\n",
);
const { syncPublishExports } = await import(pathToFileURL(join(temp, "builder.mjs")).href);
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const NodeServices = await import(
  pathToFileURL(require.resolve("@effect/platform-node/NodeServices")).href
);
let serial = 0;
async function resolves({
  published = true,
  sourceOnly = false,
  nested = false,
  bun = false,
  stem = "Entry",
  moduleName = "RawApi",
  encoded = false,
} = {}) {
  const spelling = encoded
    ? Array.from(moduleName, (char) =>
        /^[a-z0-9_]$/.test(char) ? char : "-" + char.codePointAt(0).toString(16) + "-",
      ).join("")
    : Array.from(moduleName, (char) => Array.from(char.toLowerCase())[0]).join("");
  const dir = join(temp, "fixture-" + serial++),
    prefix = (sourceOnly ? "Bootstrap/" : "") + (nested ? "Nested/" : "");
  for (const kind of ["src", "lib"]) mkdirSync(join(dir, kind, prefix), { recursive: true });
  writeFileSync(join(dir, "src/index.ts"), "");
  writeFileSync(
    join(dir, "src", prefix + stem + ".vibe"),
    "module " +
      moduleName +
      " { export function parse(s:string):unknown{return JSON.parse(s)} }\nimport {parse} from " +
      moduleName +
      ";export {parse};",
  );

  writeFileSync(join(dir, "src", prefix + stem + ".vibe.user.ts"), "export const value=1;");
  writeFileSync(join(dir, "lib", prefix + stem + ".vibe.user.js"), "export const value=1;");
  writeFileSync(
    join(dir, "lib", prefix + stem + ".vibe.user.d.ts"),
    "export declare const value:1;",
  );
  writeFileSync(
    join(dir, "lib", prefix + stem + ".vibe." + spelling + ".js"),
    "export function parse(s){return JSON.parse(s)}",
  );
  writeFileSync(
    join(dir, "lib", prefix + stem + ".vibe." + spelling + ".d.ts"),
    "export declare function parse(s:string):unknown;",
  );
  writeFileSync(
    join(dir, "lib", prefix + stem + ".js"),
    'export {parse} from "./' + stem + ".vibe." + spelling + '.js";',
  );
  writeFileSync(
    join(dir, "lib", prefix + stem + ".d.ts"),
    'export {parse} from "./' + stem + ".vibe." + spelling + '.js";',
  );
  writeFileSync(
    join(dir, "tsconfig.json"),
    JSON.stringify({ compilerOptions: { outDir: "./lib" } }),
  );
  writeFileSync(
    join(dir, "package.json"),
    JSON.stringify({ name: "fixture", type: "module", exports: {} }),
  );
  await Effect.runPromise(
    Effect.provide(
      syncPublishExports(dir, {
        generate: true,
        worker: true,
        ...(sourceOnly ? { sourceOnly: ["./Bootstrap/*"] } : {}),
      }),
      NodeServices.layer,
    ),
  );
  const manifest = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
  if (published)
    writeFileSync(
      join(dir, "package.json"),
      JSON.stringify({ ...manifest, exports: manifest.publishConfig.exports }),
    );
  const helper = "fixture/" + prefix + stem + ".vibe." + spelling + "",
    control = "fixture/" + prefix + stem + ".vibe.user",
    facade = "fixture/" + prefix + stem;
  const code =
    "const out={control:(await import(" +
    JSON.stringify(control) +
    ")).value};" +
    (published
      ? "out.facade=(await import(" + JSON.stringify(facade) + ")).parse('{\"ok\":true}').ok;"
      : "") +
    "try{out.helper=Object.keys(await import(" +
    JSON.stringify(helper) +
    "));}catch(e){out.error=e.code??e.name;}console.log(JSON.stringify(out));";
  const probe = join(dir, "probe.mjs");
  writeFileSync(probe, code);
  const result = spawnSync(bun ? "bun" : process.execPath, [probe], { cwd: dir, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const out = JSON.parse(result.stdout);
  assert.equal(out.control, 1);
  if (published)
    assert.equal(out.facade, true, "relative imports of the private helper must still work");
  assert.equal(
    out.helper,
    undefined,
    "compiler raw implementation must not become a package subpath",
  );
  assert.ok(out.error);
  const typeProbe = join(dir, "type-probe.mjs");
  writeFileSync(
    typeProbe,
    "const out={control:import.meta.resolve(" +
      JSON.stringify(control) +
      ")};try{out.helper=import.meta.resolve(" +
      JSON.stringify(helper) +
      ");}catch(e){out.error=e.code??e.name;}console.log(JSON.stringify(out));",
  );
  const typeResult = spawnSync(process.execPath, ["--conditions=types", typeProbe], {
    cwd: dir,
    encoding: "utf8",
  });
  assert.equal(typeResult.status, 0, typeResult.stderr);
  const types = JSON.parse(typeResult.stdout);
  assert.ok(
    fileURLToPath(types.control).endsWith(
      stem + ".vibe.user" + (sourceOnly || !published ? ".ts" : ".d.ts"),
    ),
  );
  assert.equal(
    types.helper,
    undefined,
    "the types condition must not expose raw implementation declarations",
  );
  assert.ok(types.error);
}
void test("published Node consumers cannot import a named inline-module implementation", () =>
  resolves());
void test("development Bun and more specific source-only wildcards keep named helpers private", () =>
  resolves({ published: false, sourceOnly: true, nested: true, bun: true }));
void test("named compiler helpers stay private across source paths and runtimes", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        published: fc.boolean(),
        sourceOnly: fc.boolean(),
        nested: fc.boolean(),
        bun: fc.boolean(),
        moduleName: fc.constantFrom(...corpus.moduleNames),
        encoded: fc.boolean(),
        stem: fc.constantFrom("Entry", "with spaces", "unicode λ", "dots.name"),
      }),
      resolves,
    ),
    { seed: corpus.seed, numRuns: 80 },
  );
});
