import * as Layer from "effect/Layer";
import { ListDockerImages } from "./ListDockerImages.vibe";
/**
 * HTTP implementation of {@link ListDockerImages}.
 *
 * @layer
 * @provides GCP.ArtifactRegistry.ListDockerImages
 */
export declare const ListDockerImagesHttp: Layer.Layer<ListDockerImages, never, never>;
