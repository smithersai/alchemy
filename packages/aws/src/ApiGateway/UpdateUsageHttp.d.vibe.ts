import * as Layer from "effect/Layer";
import { UpdateUsage } from "./UpdateUsage.vibe";
/**
 * HTTP implementation of the {@link UpdateUsage} binding. Grants
 * `apigateway:PATCH` on the plan's per-key `/usage` paths and calls the
 * API with the host Function's credentials.
 */
export declare const UpdateUsageHttp: Layer.Layer<UpdateUsage, never, never>;
