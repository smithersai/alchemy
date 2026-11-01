import * as AWS from "@alchemy.run/aws";
import * as Kubernetes from "@alchemy.run/kubernetes";
import * as Effect from "effect/Effect";
/**
 * A one-shot `Kubernetes.Job` in the INLINE EFFECT form: props + an init Effect
 * whose impl returns `{ run }` — a one-shot entry that executes to
 * completion inside the pod, after which the process exits (the Kubernetes
 * analog of `AWS.ECS.Task`).
 *
 * The Effect program is bundled into a generated image
 * (`main: import.meta.url` names this module as the entrypoint). The
 * `AWS.DynamoDB.PutItem` binding injects the table's name into the pod and
 * grants `dynamodb:PutItem` on the generated pod-identity role.
 *
 * Applying the batch/v1 Job runs it: the seed executes once on deploy.
 * Adding `schedule: "0 3 * * *"` to the props would synthesize a CronJob
 * instead.
 */
declare const _default: Effect.Effect<Kubernetes.Job & import("alchemy").Rpc<{
    run: Effect.Effect<void, never, never>;
}> & import("alchemy").Named<"SeedJob">, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | Kubernetes.Providers | AWS.Providers | AWS.Region> & import("alchemy").Named<"SeedJob"> & import("alchemy").PlatformIdentity<"SeedJob">;
export default _default;
