import { expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { fc } from "../../type-consumers-helper.mjs";
import { RepoConflict, RepoNotFound } from "../src/Api.ts";
import corpus from "./corpus/alchemy-artifacts-errors.json";

function roundTrip(name, message) {
  for (const [ErrorClass, fields] of [
    [RepoNotFound, { name }],
    [RepoConflict, { message }],
  ]) {
    const error = new ErrorClass(fields);
    const codec = Schema.toCodecJson(ErrorClass);
    const encoded = JSON.parse(JSON.stringify(Schema.encodeSync(codec)(error)));
    const decoded = Schema.decodeUnknownSync(codec)(encoded);
    expect(decoded).toBeInstanceOf(ErrorClass);
    expect(decoded._tag).toBe(error._tag);
    for (const [key, value] of Object.entries(fields)) expect(decoded[key]).toBe(value);
    expect(Effect.runSync(Effect.flip(error))).toBe(error);
  }
}

test("Artifacts errors retain their declared fields and failure tags over JSON", () => {
  for (const value of corpus) roundTrip(value.name, value.message);
});

test("generated repository names and conflicts round-trip through the real HTTP schemas", () => {
  fc.assert(fc.property(fc.string(), fc.string(), roundTrip), { seed: 77137, numRuns: 128 });
});
