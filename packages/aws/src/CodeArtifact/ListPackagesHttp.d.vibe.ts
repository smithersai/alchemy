import * as Layer from "effect/Layer";
import { ListPackages } from "./ListPackages.js";
/** HTTP implementation of {@link ListPackages} over the CodeArtifact API. */
export declare const ListPackagesHttp: Layer.Layer<ListPackages, never, never>;
