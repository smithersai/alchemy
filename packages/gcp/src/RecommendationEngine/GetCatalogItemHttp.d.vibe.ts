import { Credentials } from "@distilled.cloud/gcp/Credentials";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import { GetCatalogItem } from "./GetCatalogItem.vibe";
/**
 * HTTP implementation of {@link GetCatalogItem}.
 *
 * @layer
 * @provides GCP.RecommendationEngine.GetCatalogItem
 */
export declare const GetCatalogItemHttp: Layer.Layer<GetCatalogItem, never, Credentials | HttpClient.HttpClient>;
