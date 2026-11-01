import { Credentials } from "@distilled.cloud/gcp/Credentials";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import { GetCluster } from "./GetCluster.js";
/**
 * HTTP implementation of {@link GetCluster}.
 *
 * @layer
 * @provides GCP.ManagedKafka.GetCluster
 */
export declare const GetClusterHttp: Layer.Layer<GetCluster, never, Credentials | HttpClient.HttpClient>;
