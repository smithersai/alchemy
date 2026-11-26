import * as Schema from "effect/Schema";

/** Decode the visits endpoint before updating the UI state. */
export const decodeVisits = Schema.decodeUnknownSync(
  Schema.Struct({ visits: Schema.NullOr(Schema.Number) }),
);
