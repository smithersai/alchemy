import * as Effect from "effect/Effect";

/** A `File` named `name` whose text is `bytes` encoded as base64, made when the Effect runs. */
export const base64File = (
  bytes: Uint8Array,
  name: string,
  options: FilePropertyBag,
): Effect.Effect<File> =>
  Effect.sync(() => new File([Buffer.from(bytes).toString("base64")], name, options));
