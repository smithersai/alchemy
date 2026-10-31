import * as Layer from "effect/Layer";
import { UploadLayerPart } from "./UploadLayerPart.js";
/** HTTP implementation of {@link UploadLayerPart} over the ECR API. */
export declare const UploadLayerPartHttp: Layer.Layer<UploadLayerPart, never, never>;
