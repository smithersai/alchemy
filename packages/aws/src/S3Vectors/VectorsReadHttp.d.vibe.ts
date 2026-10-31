import * as Layer from "effect/Layer";
import { VectorsRead } from "./VectorsRead.js";
/**
 * HTTP implementation of {@link VectorsRead} — calls the S3 Vectors data
 * plane with the host Function's own credentials, granting only the read
 * actions (`QueryVectors`, `GetVectors`, `ListVectors`) on the bound index.
 */
export declare const VectorsReadHttp: Layer.Layer<VectorsRead, never, never>;
