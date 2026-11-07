import * as Layer from "effect/Layer";
import { BatchDeleteImage } from "./BatchDeleteImage.vibe";
/** HTTP implementation of {@link BatchDeleteImage} over the ECR API. */
export declare const BatchDeleteImageHttp: Layer.Layer<BatchDeleteImage, never, never>;
