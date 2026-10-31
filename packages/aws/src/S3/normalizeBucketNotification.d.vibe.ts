import * as Effect from "effect/Effect";
import type { BucketNotification } from "./BucketNotifications.js";
import type { S3Record } from "./S3Event.js";
export declare const normalizeBucketNotification: (record: S3Record) => Effect.Effect<BucketNotification, never, never>;
