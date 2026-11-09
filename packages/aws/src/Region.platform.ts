import * as Effect from "effect/Effect";

/** The host's `AWS_REGION` environment variable, read now. */
export const awsRegionFromEnv = (): Effect.Effect<string | undefined> =>
  Effect.succeed(process.env.AWS_REGION);
