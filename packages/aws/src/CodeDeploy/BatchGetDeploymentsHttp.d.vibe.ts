import * as Layer from "effect/Layer";
import { BatchGetDeployments } from "./BatchGetDeployments.vibe";
/**
 * Bespoke IAM: `codedeploy:BatchGetDeployments` does not support
 * resource-level permissions (a batch of deployment ids cannot be mapped to
 * a deployment-group resource before authorization), so the grant must be
 * on `*` — a group-scoped grant is denied with AccessDeniedException.
 */
export declare const BatchGetDeploymentsHttp: Layer.Layer<BatchGetDeployments, never, never>;
