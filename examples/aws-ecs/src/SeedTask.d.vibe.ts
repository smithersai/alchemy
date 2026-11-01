import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
/**
 * A one-shot `AWS.ECS.Task` in the INLINE EFFECT form: props + an init
 * Effect whose impl returns `{ run }` — a one-shot entry that executes to
 * completion when the container starts, after which the container exits.
 *
 * The Effect program is bundled into a generated image `FROM image`
 * (`main: import.meta.url` names this module as the entrypoint). The
 * `AWS.DynamoDB.PutItem` binding injects the table's name into the
 * container environment and grants `dynamodb:PutItem` on the task role.
 *
 * Nothing runs this task on deploy — it is the target of the
 * `AWS.ECS.RunTask(cluster, SeedTask)` binding the `Api` service exposes at
 * `POST /api/seed`. A task definition is cluster-independent (mirroring
 * `AWS::ECS::TaskDefinition`), so the launch cluster is declared where the
 * launch is bound, not here.
 */
declare const _default: Effect.Effect<AWS.ECS.Task & import("alchemy").Rpc<{
    run: Effect.Effect<void, never, never>;
}> & import("alchemy").Named<"SeedTask">, never, AWS.Providers> & import("alchemy").Named<"SeedTask"> & import("alchemy").PlatformIdentity<"SeedTask">;
export default _default;
