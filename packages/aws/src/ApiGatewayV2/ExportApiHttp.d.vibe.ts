import * as Layer from "effect/Layer";
import { ExportApi } from "./ExportApi.vibe";
/**
 * HTTP implementation of the {@link ExportApi} binding. Grants
 * `apigateway:GET` on the API's `/exports/*` path and calls the API with
 * the host Function's credentials.
 */
export declare const ExportApiHttp: Layer.Layer<ExportApi, never, never>;
