import { Credentials } from "@distilled.cloud/gcp/Credentials";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import { RunJob } from "./RunJob.vibe";
/**
 * HTTP implementation of {@link RunJob}.
 *
 * @layer
 * @provides GCP.CloudScheduler.RunJob
 */
export declare const RunJobHttp: Layer.Layer<RunJob, never, Credentials | HttpClient.HttpClient>;
