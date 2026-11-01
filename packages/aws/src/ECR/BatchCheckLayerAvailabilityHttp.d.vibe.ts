import * as Layer from "effect/Layer";
import { BatchCheckLayerAvailability } from "./BatchCheckLayerAvailability.vibe";
/** HTTP implementation of {@link BatchCheckLayerAvailability} over the ECR API. */
export declare const BatchCheckLayerAvailabilityHttp: Layer.Layer<BatchCheckLayerAvailability, never, never>;
