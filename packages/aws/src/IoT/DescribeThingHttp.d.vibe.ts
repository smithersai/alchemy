import * as Layer from "effect/Layer";
import { DescribeThing } from "./DescribeThing.vibe";
/**
 * HTTP implementation of the {@link DescribeThing} capability — grants
 * `iot:DescribeThing` on the thing ARN and calls the IoT `DescribeThing`
 * API.
 */
export declare const DescribeThingHttp: Layer.Layer<DescribeThing, never, never>;
