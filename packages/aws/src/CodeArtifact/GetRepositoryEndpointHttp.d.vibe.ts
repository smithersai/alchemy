import * as Layer from "effect/Layer";
import { GetRepositoryEndpoint } from "./GetRepositoryEndpoint.vibe";
/** HTTP implementation of {@link GetRepositoryEndpoint} over the CodeArtifact API. */
export declare const GetRepositoryEndpointHttp: Layer.Layer<GetRepositoryEndpoint, never, never>;
