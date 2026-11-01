import * as Railway from "@alchemy.run/railway";
/**
 * Minimal Railway stack: a Project and an image Service.
 * The full graph (Postgres, Redis, Bucket, Volume, Variable,
 * Environment, TcpProxy, Effect Service + bindings) is
 * `examples/railway-service`.
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    projectId: Alchemy.Output<string, never>;
    projectName: Alchemy.Output<string, never>;
    serviceId: Alchemy.Output<string, never>;
}, NoInfer<Railway.Providers>>;
export default _default;
