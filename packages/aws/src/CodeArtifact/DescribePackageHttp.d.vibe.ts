import * as Layer from "effect/Layer";
import { DescribePackage } from "./DescribePackage.vibe";
/** HTTP implementation of {@link DescribePackage} over the CodeArtifact API. */
export declare const DescribePackageHttp: Layer.Layer<DescribePackage, never, never>;
