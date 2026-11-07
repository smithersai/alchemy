import * as Layer from "effect/Layer";
import { GetEntity } from "./GetEntity.vibe";
/**
 * HTTP implementation of {@link GetEntity}.
 *
 * @layer
 * @provides GCP.Connectors.GetEntity
 */
export declare const GetEntityHttp: Layer.Layer<GetEntity, never, never>;
