import { Credentials } from "@distilled.cloud/gcp/Credentials";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import { GetConnectCluster } from "./GetConnectCluster.js";
/**
 * HTTP implementation of {@link GetConnectCluster}.
 *
 * @layer
 * @provides GCP.ManagedKafka.GetConnectCluster
 */
export declare const GetConnectClusterHttp: Layer.Layer<GetConnectCluster, never, Credentials | HttpClient.HttpClient>;
