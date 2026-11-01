import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
/**
 * Shared infrastructure for the HyperPod cluster.
 *
 * Resources are memoized by logical id, so this Effect can be yielded from
 * the stack program and from any other module and always converges on the
 * same single resource instances.
 */
export declare const HyperPodInfra: Effect.Effect<{
    bucket: AWS.S3.Bucket;
    role: AWS.IAM.Role;
}, never, AWS.Providers>;
