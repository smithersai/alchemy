import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { CommandExecutor } from "../../packages/alchemy/src/Command/Command.ts";
import { Exec, ExecProvider } from "../../packages/alchemy/src/Command/Exec.vibe";
import * as Provider from "../../packages/alchemy/src/Provider.ts";
const require = createRequire(new URL("../../scripts/package.json", import.meta.url));
const fc = require("fast-check");
const effectRequire = createRequire(
  new URL("../../packages/alchemy/package.json", import.meta.url),
);
const Cause = await import(pathToFileURL(effectRequire.resolve("effect/Cause")).href);
const Effect = await import(pathToFileURL(effectRequire.resolve("effect/Effect")).href);
const Exit = await import(pathToFileURL(effectRequire.resolve("effect/Exit")).href);

const corpus = JSON.parse(
  readFileSync(new URL("./alchemy-exec-foreign-guard.json", import.meta.url), "utf8"),
);
const provider = await Effect.runPromise(
  Provider.findProvider(Exec).pipe(
    Effect.provide(ExecProvider()),
    Effect.provideService(CommandExecutor, {
      run: () => Effect.die("diff must not run a command"),
    }),
  ),
);
function input(news, output) {
  return {
    id: "exec",
    fqn: "exec",
    instanceId: "instance",
    olds: { command: "old", memo: false },
    news,
    output,
    oldBindings: [],
    newBindings: [],
  };
}
async function check({ state, present, command }) {
  const marker = new Error("getter failure");
  let reads = 0;
  const news = { command, memo: false };
  Object.defineProperty(news, "env", {
    enumerable: true,
    get() {
      reads++;
      if (state === "getter-throws") throw marker;
      return { VALUE: state === "unresolved" ? Effect.succeed("later") : "now" };
    },
  });
  const output = present ? { hash: { input: "old-hash" } } : undefined;
  const program = provider.diff(input(news, output));
  assert.equal(reads, 0, "constructing the diff must remain cold");
  const result = await Effect.runPromiseExit(program);
  if (!present) {
    assert.equal(reads, 0, "missing output short-circuits before touching props");
    assert.ok(Exit.isSuccess(result));
    assert.equal(result.value, undefined);
  } else if (state === "getter-throws") {
    assert.ok(Exit.isFailure(result));
    assert.equal(Cause.squash(result.cause), marker, "the original thrown object remains a defect");
    assert.equal(reads, 1);
  } else {
    assert.ok(Exit.isSuccess(result));
    assert.deepEqual(result.value, state === "unresolved" ? undefined : { action: "update" });
    assert.equal(reads, 1);
  }
}

const mode = process.argv[2];
let cases = 0;
if (mode === "throw") {
  await check({ state: "getter-throws", present: false, command: "unused" });
  await check({ state: "getter-throws", present: true, command: "unused" });
  cases = 2;
} else if (mode === "resolved") {
  await check({ state: "unresolved", present: true, command: "unused" });
  await check({ state: "resolved", present: true, command: "unused" });
  cases = 2;
} else if (mode === "primitive") {
  for (const news of [false, 0, "", null, undefined]) {
    const result = await Effect.runPromiseExit(
      provider.diff(input(news, { hash: { input: undefined } })),
    );
    if (news == null) {
      assert.ok(Exit.isFailure(result));
      assert.ok(Cause.squash(result.cause) instanceof TypeError);
    } else {
      assert.ok(Exit.isSuccess(result));
      assert.deepEqual(result.value, { action: "update" });
    }
    cases++;
  }
} else if (mode === "property") {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        state: fc.constantFrom(...corpus.states),
        present: fc.boolean(),
        command: fc.string({ maxLength: 40 }),
      }),
      async (input) => {
        await check(input);
        cases++;
      },
    ),
    { seed: corpus.seed, numRuns: corpus.runs },
  );
} else {
  throw new Error("Unknown guard probe mode: " + mode);
}
console.log(JSON.stringify({ mode, cases, passed: true }));
