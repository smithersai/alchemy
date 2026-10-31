import * as Layer from "effect/Layer";
import { PublishPackageVersion } from "./PublishPackageVersion.js";
/** HTTP implementation of {@link PublishPackageVersion} over the CodeArtifact API. */
export declare const PublishPackageVersionHttp: Layer.Layer<PublishPackageVersion, never, never>;
