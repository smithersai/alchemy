import * as Layer from "effect/Layer";
import { UploadLayerPart } from "./UploadLayerPart.vibe";
/** HTTP implementation of {@link UploadLayerPart} over the ECR API. */
export declare const UploadLayerPartHttp: Layer.Layer<UploadLayerPart, never, never>;
