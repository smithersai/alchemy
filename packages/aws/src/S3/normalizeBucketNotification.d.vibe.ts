import * as Effect from "effect/Effect";
import type { BucketNotification } from "./BucketNotifications.vibe";
import type { S3Record } from "./S3Event.ts";
export declare const normalizeBucketNotification: (record: S3Record) => Effect.Effect<BucketNotification, never, never>;
