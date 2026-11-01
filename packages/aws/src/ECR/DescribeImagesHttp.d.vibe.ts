import * as Layer from "effect/Layer";
import { DescribeImages } from "./DescribeImages.vibe";
/** HTTP implementation of {@link DescribeImages} over the ECR API. */
export declare const DescribeImagesHttp: Layer.Layer<DescribeImages, never, never>;
