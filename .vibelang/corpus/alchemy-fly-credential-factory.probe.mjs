import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { lazyCredentials } from "../../packages/alchemy/src/Auth/Resolve.ts";
import { fromAuthProvider } from "../../packages/fly/src/Credentials.vibe";
const require = createRequire(new URL("../../packages/fly/package.json", import.meta.url));
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const Layer = await import(pathToFileURL(require.resolve("effect/Layer")).href);
let reads = 0;
const program = lazyCredentials()("test-provider", (value) => {
  reads++;
  return value;
});
assert.ok(Effect.isEffect(program));
assert.equal(reads, 0);
for (let n = 0; n < 16; n++) assert.ok(Layer.isLayer(fromAuthProvider()));
assert.equal(reads, 0);
console.log(JSON.stringify({ factories: 16, reads, passed: true }));
