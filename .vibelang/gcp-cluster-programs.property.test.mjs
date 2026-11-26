import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../packages/gcp/package.json", import.meta.url));
const Effect = require("effect/Effect");
const Cause = require("effect/Cause");
const fc = createRequire(new URL("../scripts/package.json", import.meta.url))("fast-check");
const binary = (
  await import(new URL("../node_modules/vibelang/binary.mjs", import.meta.url))
).findBinary();
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-cluster-retained-programs.json", import.meta.url), "utf8"),
);
function declaration(file, name) {
  const source = readFileSync(file, "utf8");
  const parsed = spawnSync(binary, ["--estree", file], {
    input: source,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  assert.equal(parsed.status, 0, parsed.stderr);
  let found;
  function visit(value) {
    if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === "object") {
      if (
        value.type === "VariableDeclaration" &&
        value.declarations.some((item) => item.id.name === name)
      )
        found = value;
      Object.values(value).forEach(visit);
    }
  }
  visit(JSON.parse(parsed.stdout).ast);
  assert.ok(found, name);
  return Array.from(source)
    .slice(...found.range)
    .join("");
}
async function fixture(main, transport, check, transportFile = "transport.ts") {
  const temporary = mkdtempSync(join(root, ".vibelang-toolchain/cluster-program-"));
  try {
    symlinkSync(join(root, "packages/gcp/node_modules"), join(temporary, "node_modules"), "dir");
    writeFileSync(join(temporary, "package.json"), '{"type":"module"}');
    writeFileSync(join(temporary, "main.vibe"), main);
    if (transport) writeFileSync(join(temporary, transportFile), transport);
    writeFileSync(
      join(temporary, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ESNext",
          module: "Preserve",
          moduleResolution: "Bundler",
          strict: false,
          skipLibCheck: true,
          types: ["bun"],
          noEmit: false,
          outDir: "out",
          allowArbitraryExtensions: true,
          rewriteRelativeImportExtensions: true,
        },
        files: transportFile.endsWith(".vibe") ? ["main.vibe", transportFile] : ["main.vibe"],
      }),
    );
    const compiled = spawnSync(
      binary,
      ["-p", join(temporary, "tsconfig.json"), "--pretty", "false"],
      {
        cwd: root,
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
        timeout: 120000,
      },
    );
    assert.ifError(compiled.error);
    assert.equal(compiled.status, 0, compiled.stdout + compiled.stderr);
    await check(await import(pathToFileURL(join(temporary, "out/main.js"))));
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}
void test("default pool deletion reruns cold and waits only for a real operation", async () => {
  const base = join(root, "packages/gcp/src/Container/Cluster");
  const source = base + (existsSync(base + ".vibe") ? ".vibe" : ".ts");
  const body = declaration(source, "ensureDefaultPoolRemoved");
  await fixture(
    `
import * as Effect from "effect/Effect";
import * as Schedule from "effect/Schedule";
const DEFAULT_POOL_NAME = "default-pool";
let mode = "present"; let requests: string[] = []; let waits = 0;
export const marker = {_tag: "Other" as const};
export const configure = (value: string) => { mode=value; requests=[]; waits=0; };
export const observed = () => ({requests, waits});
const container = {
 deleteProjectsLocationsClustersNodePools: (input: {name:string}): Effect.Effect<{name:string}, {_tag:"NotFound"|"Conflict"|"Other"}> =>
  Effect.suspend((): Effect.Effect<{name:string}, {_tag:"NotFound"|"Conflict"|"Other"}> => {
   requests.push(input.name);
   if(mode==="missing") return Effect.fail({_tag:"NotFound" as const});
   if(mode==="typed") return Effect.fail(marker);
   if(mode==="defect") return Effect.die(marker);
   return Effect.succeed({name:"operation"});
  })
};
const waitForOperation = (_project:string,_location:string,_operation:unknown,_options:unknown) =>
 Effect.sync(() => { waits++; });
export ${body}
`,
    null,
    async (module) => {
      await fc.assert(
        fc.asyncProperty(
          fc.stringMatching(/^[a-z0-9-]{1,20}$/),
          fc.constantFrom(...corpus.modes),
          async (cluster, mode) => {
            module.configure(mode);
            const program = module.ensureDefaultPoolRemoved("project", "location", cluster);
            assert.deepEqual(module.observed(), { requests: [], waits: 0 });
            for (let replay = 1; replay <= 2; replay++) {
              const result = await Effect.runPromiseExit(program);
              if (mode === "present" || mode === "missing") {
                assert.equal(result._tag, "Success");
                assert.equal(result.value, mode === "present");
              } else {
                assert.equal(result._tag, "Failure");
                const reason = result.cause.reasons[0];
                assert.equal(reason._tag, mode === "typed" ? "Fail" : "Die");
                assert.equal(mode === "typed" ? reason.error : reason.defect, module.marker);
              }
              assert.deepEqual(module.observed(), {
                requests: Array(replay).fill(cluster + "/nodePools/default-pool"),
                waits: mode === "present" ? replay : 0,
              });
            }
          },
        ),
        { seed: corpus.poolSeed, numRuns: corpus.runs },
      );
    },
  );
});
void test("cluster transport keeps missing-state errors and throwing getters deferred", async () => {
  const base = join(root, "packages/gcp/src/Container/Cluster");
  const native = existsSync(base + ".vibe");
  const transportFile = native ? "transport.vibe" : "transport.ts";
  const body = declaration(base + (native ? ".vibe" : ".ts"), "getKubernetesTransport");
  const transport = `
import * as Effect from "effect/Effect";
type Cluster = { Attributes: { clusterId: string; endpoint?: string; certificateAuthorityData?: string } };
const makeGkeTransport = (input: unknown) => Effect.succeed(input);
export ${body}
`;
  await fixture(
    `export { getKubernetesTransport } from "./${transportFile}";`,
    transport,
    async (module) => {
      await fc.assert(
        fc.asyncProperty(
          fc.option(fc.string({ maxLength: 20 }), { nil: undefined }),
          fc.option(fc.string({ maxLength: 20 }), { nil: undefined }),
          async (endpoint, certificate) => {
            const reads = [];
            const state = {
              get endpoint() {
                reads.push("endpoint");
                return endpoint;
              },
              get certificateAuthorityData() {
                reads.push("certificate");
                return certificate;
              },
              get clusterId() {
                reads.push("clusterId");
                return "cluster";
              },
            };
            const program = module.getKubernetesTransport(state);
            assert.deepEqual(reads, []);
            const result = await Effect.runPromiseExit(program);
            if (endpoint && certificate) {
              assert.equal(result._tag, "Success");
              assert.deepEqual(result.value, { endpoint, certificateAuthorityData: certificate });
              assert.deepEqual(reads, ["endpoint", "certificate", "endpoint", "certificate"]);
            } else {
              assert.equal(result._tag, "Failure");
              assert.equal(
                Cause.squash(result.cause).message,
                "GKE cluster 'cluster' is missing endpoint or certificate authority data",
              );
              assert.deepEqual(
                reads,
                endpoint ? ["endpoint", "certificate", "clusterId"] : ["endpoint", "clusterId"],
              );
            }
          },
        ),
        { seed: corpus.transportSeed, numRuns: corpus.runs },
      );
      const marker = { sentinel: true };
      const program = module.getKubernetesTransport({
        get endpoint() {
          throw marker;
        },
      });
      const result = await Effect.runPromiseExit(program);
      assert.equal(result._tag, "Failure");
      assert.equal(result.cause.reasons[0].defect, marker);
    },
    transportFile,
  );
});
