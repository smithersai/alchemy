import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
const root = new URL("../", import.meta.url);
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-webhook-doc-link.json", import.meta.url), "utf8"),
);
const normalize = (text) =>
  text
    .replace(/^\s*\* ?/gm, "")
    .replace(/\s+/g, " ")
    .trim();
const comments = (text) => text.match(/\/\*\*[\s\S]*?\*\//g) ?? [];
void test("Webhook keeps the oracle documentation while its code imports the converted source", () => {
  const source = readFileSync(new URL(corpus.file, root), "utf8");
  assert.ok(comments(source).some((comment) => normalize(comment) === corpus.oracle));
  assert.match(source, /import type \{ WebhookEventName \} from "\.\/RepositoryEventSource\.vibe"/);
});
void test("documentation import links keep their literal extensions across whitespace variations", () => {
  const oracleLink =
    '{@link import("./RepositoryEventSource.ts").events | events(repository, handler)}';
  fc.assert(
    fc.property(
      fc.array(fc.constantFrom(" ", "\n * ", "\t"), { minLength: 1, maxLength: 8 }),
      (spaces) => {
        const text = "/**" + spaces.join("") + oracleLink + spaces.join("") + "*/";
        assert.ok(normalize(comments(text)[0]).includes(oracleLink));
        assert.notEqual(
          normalize(text),
          normalize(text.replace("RepositoryEventSource.ts", "RepositoryEventSource.vibe")),
        );
      },
    ),
    { seed: corpus.seed, numRuns: 80 },
  );
});
