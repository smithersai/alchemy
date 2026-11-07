import * as Layer from "effect/Layer";
import { DescribePackageVersion } from "./DescribePackageVersion.vibe";
/** HTTP implementation of {@link DescribePackageVersion} over the CodeArtifact API. */
export declare const DescribePackageVersionHttp: Layer.Layer<DescribePackageVersion, never, never>;
