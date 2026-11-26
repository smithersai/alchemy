import { expect, test } from "bun:test";
import { createRequire } from "node:module";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { Todo, TodoNotFound } from "../src/backend/rpc.ts";
import corpus from "./corpus/alchemy-rpc-todo-not-found.json";

const require = createRequire(import.meta.url);
const testRequire = createRequire(require.resolve("@alchemy.run/test/package.json"));
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
const errorCodec = Schema.toCodecJson(TodoNotFound);
const todoCodec = Schema.toCodecJson(Todo);

test("missing todos fail as the declared RPC error", () => {
  for (const fields of corpus) {
    const error = new TodoNotFound(fields);
    expect(error._tag).toBe("TodoNotFound");
    expect(error.message).toBe(fields.message);
    expect(error.id).toBe(fields.id);
    expect(Effect.runSync(Effect.flip(error))).toBe(error);
    const encoded = Schema.encodeSync(errorCodec)(error);
    const decoded = Schema.decodeUnknownSync(errorCodec)(JSON.parse(JSON.stringify(encoded)));
    expect(decoded).toBeInstanceOf(TodoNotFound);
    expect(decoded.id).toBe(fields.id);
    expect(decoded.message).toBe(fields.message);
  }
});

test("generated missing-todo errors round-trip through the actual wire schema", () => {
  fc.assert(
    fc.property(fc.integer(), fc.string(), (id, message) => {
      const error = new TodoNotFound({ id, message });
      const encoded = Schema.encodeSync(errorCodec)(error);
      expect(encoded).toEqual({ _tag: "TodoNotFound", id, message });
      expect(Schema.decodeUnknownSync(errorCodec)(JSON.parse(JSON.stringify(encoded)))).toEqual(
        error,
      );
      expect(Effect.runSync(Effect.flip(error))).toBe(error);
    }),
    { seed: 77133, numRuns: 128 },
  );
});

test("generated todos retain their date, text and completion state over the wire", () => {
  fc.assert(
    fc.property(
      fc.integer(),
      fc.string(),
      fc.boolean(),
      fc.integer({ min: 0, max: 2000000000 }),
      (id, text, done, seconds) => {
        const todo = new Todo({ id, text, done, createdAt: new Date(seconds * 1000) });
        const encoded = Schema.encodeSync(todoCodec)(todo);
        const decoded = Schema.decodeUnknownSync(todoCodec)(JSON.parse(JSON.stringify(encoded)));
        expect(decoded).toEqual(todo);
        expect(decoded.createdAt).toBeInstanceOf(Date);
        expect(JSON.parse(JSON.stringify(encoded)).createdAt).toBe(todo.createdAt.toISOString());
      },
    ),
    { seed: 77134, numRuns: 128 },
  );
});
