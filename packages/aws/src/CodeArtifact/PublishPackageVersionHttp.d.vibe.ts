import * as Layer from "effect/Layer";
import { PublishPackageVersion } from "./PublishPackageVersion.vibe";
/** HTTP implementation of {@link PublishPackageVersion} over the CodeArtifact API. */
export declare const PublishPackageVersionHttp: Layer.Layer<PublishPackageVersion, never, never>;
