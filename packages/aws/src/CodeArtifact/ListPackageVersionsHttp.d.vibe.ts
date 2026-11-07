import * as Layer from "effect/Layer";
import { ListPackageVersions } from "./ListPackageVersions.vibe";
/** HTTP implementation of {@link ListPackageVersions} over the CodeArtifact API. */
export declare const ListPackageVersionsHttp: Layer.Layer<ListPackageVersions, never, never>;
