import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
/** Turn a room's messages into a one-paragraph summary (stands in for an LLM call). */
export declare const summarize: (room: string) => Effect.Effect<string, never, never>;
/** The same two steps as Lambda functions, for the Step Functions version. */
export declare const Summarize: Effect.Effect<AWS.Lambda.Function & import("alchemy").Rpc<{}> & import("alchemy").Named<"Summarize">, never, AWS.Providers> & import("alchemy").Named<"Summarize"> & import("alchemy").PlatformIdentity<"Summarize">;
export declare const SaveDigest: Effect.Effect<AWS.Lambda.Function & import("alchemy").Rpc<{}> & import("alchemy").Named<"SaveDigest">, never, AWS.Providers> & import("alchemy").Named<"SaveDigest"> & import("alchemy").PlatformIdentity<"SaveDigest">;
