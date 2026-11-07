import * as Layer from "effect/Layer";
import { ListImages } from "./ListImages.vibe";
/** HTTP implementation of {@link ListImages} over the ECR API. */
export declare const ListImagesHttp: Layer.Layer<ListImages, never, never>;
