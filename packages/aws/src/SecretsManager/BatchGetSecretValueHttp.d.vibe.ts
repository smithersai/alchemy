import * as Layer from "effect/Layer";
import { BatchGetSecretValue } from "./BatchGetSecretValue.js";
/**
 * Bespoke (multi-secret) HTTP binding: `BatchGetSecretValue` targets a list
 * of secrets, so it can't reuse the single-secret scaffolding — the account
 * -level `secretsmanager:BatchGetSecretValue` action is granted on `*` and
 * per-secret `GetSecretValue`/`DescribeSecret` on each bound secret's ARN.
 */
export declare const BatchGetSecretValueHttp: Layer.Layer<BatchGetSecretValue, never, never>;
