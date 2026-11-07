import * as Layer from "effect/Layer";
import { Vectors } from "./Vectors.vibe";
/**
 * HTTP implementation of {@link Vectors} — calls the S3 Vectors data plane
 * with the host Function's own credentials, granting the full read+write
 * action set on the bound index. Composes the read- and write-level client
 * builders.
 */
export declare const VectorsHttp: Layer.Layer<Vectors, never, never>;
