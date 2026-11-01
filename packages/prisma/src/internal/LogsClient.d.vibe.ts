import type { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import { PrismaApiError } from "../Client.js";
import type { BuildLogsQuery, BuildLogsRequest, DeploymentLogsQuery, DeploymentLogsRequest } from "../Types.js";
import { Credentials } from "./Credentials.js";
export declare const getDeploymentLogsRequest: (deploymentId: string, query?: DeploymentLogsQuery) => Effect.Effect<DeploymentLogsRequest, PrismaApiError | ConfigError, Credentials>;
export declare const getBuildLogsRequest: (buildId: string, query?: BuildLogsQuery) => Effect.Effect<BuildLogsRequest, PrismaApiError | ConfigError, Credentials>;
