import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
declare const Api_base: Effect.Effect<AWS.ECS.Service & import("alchemy").Rpc<Api>, never, AWS.Providers> & import("alchemy").Named<"Api"> & import("alchemy").PlatformIdentity<"Api"> & {
    new (_: never): import("alchemy").Named<"Api"> & import("alchemy/Named").Tag<"AWS.ECS.Service">;
    make<PropsReq = never, InitReq extends AWS.ECS.ServiceServices | import("alchemy").PlatformServices | AWS.ECS.Service = never>(props: Effect.Effect<import("alchemy").InputProps<AWS.ECS.ServiceProps, never>, import("effect/Config").ConfigError, PropsReq> | import("alchemy").InputProps<AWS.ECS.ServiceProps, never>, impl: Effect.Effect<AWS.ECS.ServiceShape, import("effect/Config").ConfigError, InitReq>): Layer.Layer<Api, never, AWS.Providers | Exclude<InitReq, AWS.ECS.Service | import("alchemy").PlatformServices | AWS.ECS.ServiceServices> | Exclude<PropsReq, AWS.ECS.Service | import("alchemy").PlatformServices | AWS.ECS.ServiceServices>>;
};
/**
 * The orders API: an `AWS.ECS.Service` in the TAGGED form — the class
 * declares the service identity, and the default export is
 * `Api.make(props, impl)`: a Layer pairing the props with an init Effect
 * whose impl returns `{ fetch }`, bundled into a generated image
 * (`main: import.meta.url`). The Service synthesizes its own task
 * definition (task + execution roles, log group, ECR repository) from the
 * same surface as `AWS.ECS.Task`.
 *
 * The stack provides the Layer and yields the class (see `alchemy.run.ts`):
 *
 * ```typescript
 * const api = yield* Api;         // with Effect.provide(ApiLive)
 * ```
 *
 * Ingress is the SHARED listener composed at the stack level (see
 * `src/infra.ts`): this service only adds its own target group and a
 * `path: "/api/*"` listener rule. The explicit `priority: 10` orders it
 * ahead of `Web`'s catch-all `/*` rule.
 *
 * Bindings work exactly as on Lambda:
 * - `AWS.DynamoDB.GetItem` / `Scan` grant read access to the orders table
 *   and inject its name into the container environment.
 * - `AWS.ECS.RunTask(cluster, SeedTask)` grants `ecs:RunTask` on the seed
 *   task's definition (plus `iam:PassRole` on its roles), so
 *   `POST /api/seed` can launch the one-shot seeding task on Fargate. The
 *   cluster is explicit at the binding — a task definition is
 *   cluster-independent.
 */
export declare class Api extends Api_base {
}
declare const _default: Layer.Layer<Api, never, AWS.Providers>;
export default _default;
