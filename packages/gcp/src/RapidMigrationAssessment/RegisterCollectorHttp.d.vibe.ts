import { Credentials } from "@distilled.cloud/gcp/Credentials";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import { RegisterCollector } from "./RegisterCollector.js";
/**
 * HTTP implementation of {@link RegisterCollector}.
 *
 * @layer
 * @provides GCP.RapidMigrationAssessment.RegisterCollector
 */
export declare const RegisterCollectorHttp: Layer.Layer<RegisterCollector, never, Credentials | HttpClient.HttpClient>;
