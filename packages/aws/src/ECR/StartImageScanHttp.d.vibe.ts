import * as Layer from "effect/Layer";
import { StartImageScan } from "./StartImageScan.vibe";
/** HTTP implementation of {@link StartImageScan} over the ECR API. */
export declare const StartImageScanHttp: Layer.Layer<StartImageScan, never, never>;
