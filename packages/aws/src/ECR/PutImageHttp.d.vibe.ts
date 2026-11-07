import * as Layer from "effect/Layer";
import { PutImage } from "./PutImage.vibe";
/** HTTP implementation of {@link PutImage} over the ECR API. */
export declare const PutImageHttp: Layer.Layer<PutImage, never, never>;
