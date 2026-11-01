import * as Layer from "effect/Layer";
import { InitiateLayerUpload } from "./InitiateLayerUpload.vibe";
/** HTTP implementation of {@link InitiateLayerUpload} over the ECR API. */
export declare const InitiateLayerUploadHttp: Layer.Layer<InitiateLayerUpload, never, never>;
