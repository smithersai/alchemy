import * as Layer from "effect/Layer";
import { DescribeEndpoint } from "./DescribeEndpoint.vibe";
/**
 * HTTP implementation of the {@link DescribeEndpoint} capability — grants
 * `iot:DescribeEndpoint` on `*` and calls the IoT `DescribeEndpoint` API.
 */
export declare const DescribeEndpointHttp: Layer.Layer<DescribeEndpoint, never, never>;
