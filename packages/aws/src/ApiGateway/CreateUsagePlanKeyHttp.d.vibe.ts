import * as Layer from "effect/Layer";
import { CreateUsagePlanKey } from "./CreateUsagePlanKey.vibe";
/**
 * HTTP implementation of the {@link CreateUsagePlanKey} binding. Grants
 * `apigateway:POST` on the plan's `/keys` path and calls the API with the
 * host Function's credentials.
 */
export declare const CreateUsagePlanKeyHttp: Layer.Layer<CreateUsagePlanKey, never, never>;
