import * as Layer from "effect/Layer";
import { CreateWorkspaceServiceAccountToken } from "./CreateWorkspaceServiceAccountToken.vibe";
/**
 * Bespoke (not scaffold-built): the runtime request carries a
 * `timeToLive: Duration.Input` that is converted to the wire's
 * `secondsToLive` via the central Duration util.
 */
export declare const CreateWorkspaceServiceAccountTokenHttp: Layer.Layer<CreateWorkspaceServiceAccountToken, never, never>;
