import * as translate from "@distilled.cloud/gcp/translate_v3";
import * as Layer from "effect/Layer";
import { AdaptiveMtTranslate } from "./AdaptiveMtTranslate.vibe";
/**
 * HTTP implementation of {@link AdaptiveMtTranslate}.
 *
 * @layer
 * @provides GCP.Translate.AdaptiveMtTranslate
 */
export declare const AdaptiveMtTranslateHttp: Layer.Layer<AdaptiveMtTranslate, never, translate.GcpOpContext>;
