import * as Layer from "effect/Layer";
import { GetSchemaVersion } from "./GetSchemaVersion.vibe";
/**
 * HTTP implementation of {@link GetSchemaVersion}.
 *
 * @layer
 * @provides GCP.DocumentAI.GetSchemaVersion
 */
export declare const GetSchemaVersionHttp: Layer.Layer<GetSchemaVersion, never, never>;
