import * as Layer from "effect/Layer";
import { GetSchema } from "./GetSchema.vibe";
/**
 * HTTP implementation of {@link GetSchema}.
 *
 * @layer
 * @provides GCP.DocumentAI.GetSchema
 */
export declare const GetSchemaHttp: Layer.Layer<GetSchema, never, never>;
