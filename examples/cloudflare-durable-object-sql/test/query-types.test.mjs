import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { checkConsumers, fc, root } from "../../type-consumers-helper.mjs";

test(
  "generated SQL callers preserve row types and catchable query failures",
  { timeout: 120000 },
  () => {
    const corpus = JSON.parse(
      readFileSync(new URL("./corpus/alchemy-durable-object-sql-queries.json", import.meta.url)),
    );
    const cases = [
      ...corpus,
      ...fc.sample(
        fc.record({
          id: fc.string(),
          name: fc.string(),
          insert: fc.boolean(),
        }),
        { seed: 77144, numRuns: 128 },
      ),
    ];
    const source = [
      'import * as Effect from "effect/Effect";',
      'import type * as Cloudflare from "@alchemy.run/cloudflare";',
      'import type { RuntimeContext } from "alchemy/RuntimeContext";',
      'import type { EffectDrizzleQueryError } from "@alchemy.run/drizzle";',
      "import Users from " +
        JSON.stringify(join(root, "examples/cloudflare-durable-object-sql/src/Users.vibe")) +
        ";",
      "import type { User } from " +
        JSON.stringify(join(root, "examples/cloudflare-durable-object-sql/src/schema.ts")) +
        ";",
    ];
    for (const [index, value] of cases.entries()) {
      source.push(
        "const query" +
          index +
          ": Effect.Effect<readonly User[], EffectDrizzleQueryError, Cloudflare.Worker | RuntimeContext> = Effect.gen(function* () {",
        "const users = yield* Users;",
        "return yield* users.getByName(" +
          JSON.stringify(value.id) +
          ")." +
          (value.insert ? "addUser(" + JSON.stringify(value.name) + ")" : "listUsers()") +
          ";",
        "});",
        "const recovered" +
          index +
          ": Effect.Effect<readonly User[], never, Cloudflare.Worker | RuntimeContext> = query" +
          index +
          '.pipe(Effect.catchTag("EffectDrizzleQueryError", () => Effect.succeed([])));',
      );
    }
    checkConsumers("cloudflare-durable-object-sql", source.join("\n"));
  },
);
