import * as Layer from "effect/Layer";
import { VectorsWrite } from "./VectorsWrite.js";
/**
 * HTTP implementation of {@link VectorsWrite} — calls the S3 Vectors data
 * plane with the host Function's own credentials, granting only the write
 * actions (`PutVectors`, `DeleteVectors`) on the bound index.
 */
export declare const VectorsWriteHttp: Layer.Layer<VectorsWrite, never, never>;
