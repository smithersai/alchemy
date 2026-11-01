import * as Layer from "effect/Layer";
import { BatchGetImage } from "./BatchGetImage.vibe";
/** HTTP implementation of {@link BatchGetImage} over the ECR API. */
export declare const BatchGetImageHttp: Layer.Layer<BatchGetImage, never, never>;
