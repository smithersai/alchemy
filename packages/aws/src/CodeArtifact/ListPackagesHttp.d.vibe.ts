import * as Layer from "effect/Layer";
import { ListPackages } from "./ListPackages.vibe";
/** HTTP implementation of {@link ListPackages} over the CodeArtifact API. */
export declare const ListPackagesHttp: Layer.Layer<ListPackages, never, never>;
