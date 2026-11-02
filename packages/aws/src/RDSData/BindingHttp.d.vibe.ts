import * as Effect from "effect/Effect";
import type { DBCluster } from "../RDS/DBCluster.ts";
import type { Secret } from "../SecretsManager/Secret.ts";
/**
 * The common bind-time options every RDS Data API capability accepts: the
 * credentials secret, plus the optional default `database`/`schema` injected
 * into requests by operations that support them.
 */
export interface RDSDataBindingOptions {
    secret: Secret;
    database?: string;
    schema?: string;
}
/**
 * Build the impl Effect for an RDS Data API operation scoped to a
 * {@link DBCluster} + credentials {@link Secret}: the deploy-time half grants
 * `action` on the cluster and secret ARNs (plus Secrets Manager read on the
 * secret), and the runtime half shapes the wire request via `makeInput` with
 * the resolved ARNs and bind-time `database`/`schema`.
 */
export declare const makeRDSDataHttpBinding: <Req, I, A, E, R>(options: {
    /** Fully-qualified binding tag, e.g. `AWS.RDSData.ExecuteStatement`. */
    tag: string;
    /** IAM action granted on the cluster + secret ARNs, e.g. `rds-data:ExecuteStatement`. */
    action: string;
    /** The distilled operation invoked with the shaped wire request. */
    operation: Effect.Effect<(input: I) => Effect.Effect<A, E>, never, R>;
    /**
     * Shape the wire request from the caller's request plus the resolved
     * cluster/secret ARNs and the bind-time `database`/`schema`.
     */
    makeInput: (request: Req, context: {
        resourceArn: string;
        secretArn: string;
        database: string | undefined;
        schema: string | undefined;
    }) => I;
}) => Effect.Effect<(cluster: DBCluster, bindOptions: RDSDataBindingOptions) => Effect.Effect<(request?: Req | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
