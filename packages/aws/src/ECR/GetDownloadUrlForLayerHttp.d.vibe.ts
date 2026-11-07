import * as Layer from "effect/Layer";
import { GetDownloadUrlForLayer } from "./GetDownloadUrlForLayer.vibe";
/** HTTP implementation of {@link GetDownloadUrlForLayer} over the ECR API. */
export declare const GetDownloadUrlForLayerHttp: Layer.Layer<GetDownloadUrlForLayer, never, never>;
