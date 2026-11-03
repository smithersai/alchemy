import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-module-doc-attachment.json", import.meta.url), "utf8"),
);
const actualFile = corpus.file;
const source = readFileSync(process.env.ALCHEMY_DOC_SOURCE_FILE ?? join(root, actualFile), "utf8");
const prefix = source.slice(0, source.indexOf("export interface ClusterObjectProps"));
const header = prefix.match(/\/\*\*[\s\S]*?\*\//)[0];
const native = join(root, "node_modules/vibelang/native/vibelang");

function emit(samples, declarationDoc = false) {
  const dir = mkdtempSync(join(tmpdir(), "alchemy-module-doc-"));
  try {
    mkdirSync(join(dir, "src"));
    writeFileSync(
      join(dir, "src/Stub.ts"),
      "export const kubernetesObjectKey=0; export const toKubernetesObjectRef=0; export interface KubernetesObjectDefinition {} export interface KubernetesObjectMetadata {} export interface Cluster {} export interface Witness { readonly value: 1 }\n",
    );
    for (const [index, comment] of samples.entries()) {
      const prelude = prefix.replace(header, comment).replace(/from "[^"]+"/g, 'from "./Stub.ts"');
      writeFileSync(
        join(dir, "src/Probe" + index + ".vibe"),
        prelude +
          (declarationDoc ? "/** Interface contract stays. */\n" : "") +
          "export interface ClusterObjectProps { readonly value: Effect.Witness }\n",
      );
    }
    writeFileSync(
      join(dir, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          types: [],
          strict: true,
          skipLibCheck: true,
          declaration: true,
          allowArbitraryExtensions: true,
          rootDir: "./src",
          outDir: "./out",
        },
        include: ["src/**/*"],
      }),
    );
    const result = spawnSync(native, ["-p", join(dir, "tsconfig.json")], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    return samples.map((_, index) =>
      readFileSync(join(dir, "out/Probe" + index + ".d.ts"), "utf8"),
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
function interfaceDoc(declaration) {
  const before = declaration.slice(0, declaration.indexOf("export interface ClusterObjectProps"));
  const last = [...before.matchAll(/\/\*\*[\s\S]*?\*\//g)].at(-1);
  return last && before.slice(last.index + last[0].length).trim() === "" ? last[0] : "";
}
void test("the actual module header does not become the public interface contract", () => {
  assert.equal(interfaceDoc(emit([header])[0]), "");
});
void test("generated module prose stays separate while actual interface documentation remains", () => {
  const comments = fc.sample(
    fc
      .array(fc.constantFrom("Effect", "Context", "Kubernetes", "module", "helpers", "source.ts"), {
        minLength: 1,
        maxLength: 8,
      })
      .map((words) => "/** " + words.join(" ") + " */"),
    { seed: corpus.seed, numRuns: 40 },
  );
  for (const declaration of emit(comments)) assert.equal(interfaceDoc(declaration), "");
  for (const declaration of emit(comments, true))
    assert.equal(interfaceDoc(declaration), "/** Interface contract stays. */");
});
