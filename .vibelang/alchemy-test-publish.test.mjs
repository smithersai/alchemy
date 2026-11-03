import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

void test("the authored alchemy-test publish map sends bare Bun consumers to compiled modules", () => {
  const manifest = JSON.parse(
    readFileSync(new URL("../packages/alchemy-test/package.json", import.meta.url), "utf8"),
  );
  for (const [subpath, value] of Object.entries(manifest.publishConfig.exports))
    if (value && typeof value === "object")
      for (const condition of ["bun", "worker"])
        if (typeof value[condition] === "string" && value[condition].startsWith("./src/"))
          assert.equal(
            value[condition],
            value.default,
            subpath + ": plain TS can import Model.vibe; use the build",
          );
});
