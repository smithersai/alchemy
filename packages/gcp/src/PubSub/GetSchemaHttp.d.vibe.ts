import * as Layer from "effect/Layer";
import { GetSchema } from "./GetSchema.vibe";
/**
 * HTTP implementation of {@link GetSchema}.
 *
 * @layer
 * @provides GCP.PubSub.GetSchema
 */
export declare const GetSchemaHttp: Layer.Layer<GetSchema, never, never>;
