import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import * as Tags from "../../packages/pkg/src/Registry/Tags.vibe";

const require = createRequire(new URL("../../packages/pkg/package.json", import.meta.url));
const fc = createRequire(new URL("../../scripts/package.json", import.meta.url))("fast-check");
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const Exit = await import(pathToFileURL(require.resolve("effect/Exit")).href);
const Cause = await import(pathToFileURL(require.resolve("effect/Cause")).href);
const SqlClient = await import(pathToFileURL(require.resolve("effect/sql/SqlClient")).href);
const corpus = JSON.parse(
  readFileSync(new URL("./alchemy-pkg-sql-callback.json", import.meta.url), "utf8"),
);
const mode = process.argv[2];
assert.ok(corpus.modes.includes(mode));
const operations = {
  get: () => Tags.get("package", "latest"),
  upsert: () =>
    Tags.upsert({ package: "package", tag: "latest", sha256: "hash", expiresAt: 10, prs: [] }),
  resolve: () => Tags.resolve("package", "latest"),
  dueLinked: () => Tags.dueLinked(10),
  setExpiry: () => Tags.setExpiry("package", "latest", 10),
  deleteExpired: () => Tags.deleteExpired(10),
  referencedTarballs: () => Tags.referencedTarballs(),
};
let executions = 0;
if (mode === "typed-failure" || mode === "synchronous-defect") {
  for (const [name, create] of Object.entries(operations)) {
    const marker = new Error("query failure");
    let calls = 0;
    const sql = () => {
      calls++;
      if (mode === "synchronous-defect") throw marker;
      return Effect.fail(marker);
    };
    const program = Effect.provideService(create(), SqlClient.SqlClient, sql);
    assert.equal(calls, 0, name + " remains cold");
    for (let pass = 1; pass <= 2; pass++) {
      if (mode === "typed-failure") {
        const result = await Effect.runPromise(
          Effect.match(program, {
            onFailure: (error) => ({ error }),
            onSuccess: (value) => ({ value }),
          }),
        );
        assert.equal(result.error, marker, name + " preserves the SQL failure channel");
      } else {
        const result = await Effect.runPromiseExit(program);
        assert.ok(Exit.isFailure(result), name);
        assert.equal(Cause.squash(result.cause), marker, name + " preserves defect identity");
      }
      assert.equal(calls, pass, name + " executes one query per replay");
      executions++;
    }
  }
} else {
  const rows = fc.sample(
    fc.record({
      package: fc.stringMatching(/^[a-z][a-z0-9]{0,12}$/),
      sha256: fc.stringMatching(/^[a-f0-9]{1,32}$/),
      expires_at: fc.integer({ min: 0, max: 100000 }),
    }),
    { seed: corpus.seed, numRuns: corpus.runs },
  );
  for (const row of rows) {
    const decoded = { ...row, tag: "latest", linked_prs: [] };
    let calls = 0;
    const sql = () => {
      calls++;
      return Effect.succeed([{ ...decoded, linked_prs: "[]" }]);
    };
    for (const [name, create] of Object.entries(operations)) {
      const start = calls;
      const program = Effect.provideService(create(), SqlClient.SqlClient, sql);
      assert.equal(calls, start, name + " remains cold");
      for (let pass = 1; pass <= 2; pass++) {
        const value = await Effect.runPromise(program);
        if (name === "get") assert.deepEqual(value, decoded);
        if (name === "resolve") assert.equal(value, row.sha256);
        if (name === "dueLinked") assert.deepEqual(value, [decoded]);
        if (name === "deleteExpired")
          assert.deepEqual(value, [{ package: row.package, sha256: row.sha256 }]);
        if (name === "referencedTarballs")
          assert.deepEqual(value, new Set([row.package + "/" + row.sha256]));
        assert.equal(calls, start + pass, name + " executes once per replay");
        executions++;
      }
    }
  }
}
console.log(
  JSON.stringify({ mode, operations: Object.keys(operations).length, executions, passed: true }),
);
