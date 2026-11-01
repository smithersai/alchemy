import * as Layer from "effect/Layer";
import { GetPackageVersionAsset } from "./GetPackageVersionAsset.vibe";
/** HTTP implementation of {@link GetPackageVersionAsset} over the CodeArtifact API. */
export declare const GetPackageVersionAssetHttp: Layer.Layer<GetPackageVersionAsset, never, never>;
