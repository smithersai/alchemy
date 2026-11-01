import * as AWS from "@alchemy.run/aws";
/**
 * An "orders" app on ECS Fargate that exercises the full container surface:
 *
 * - a stack-owned SHARED ALB + HTTP listener (`src/infra.ts`) that two
 *   services attach path rules to,
 * - `Api` — an effectful `AWS.ECS.Service` (bundled `main:` image source)
 *   serving `/api/*` with DynamoDB + `RunTask` bindings (`src/Api.ts`),
 * - `Web` — an EXTERNAL `AWS.ECS.Service` (registry `image:` source, no
 *   Effect runtime in the container) serving the catch-all `/*`,
 * - `SeedTask` — an inline-effect one-shot `AWS.ECS.Task` (`{ run }`) that
 *   seeds the orders table, launched from `POST /api/seed` (`src/SeedTask.ts`),
 * - `ReportTask` — an external one-shot task built from a local Dockerfile
 *   (`context:` image source, `src/report/Dockerfile`),
 * - `HeartbeatTask` — an external one-shot task on an EventBridge cron
 *   schedule via `AWS.ECS.every`.
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    apiUrl: Alchemy.Output<string, never>;
    seedUrl: Alchemy.Output<string, never>;
    albDnsName: Alchemy.Output<string, never>;
    tableName: Alchemy.Output<string, never>;
    apiServiceName: Alchemy.Output<string, never>;
    webServiceName: Alchemy.Output<string, never>;
    reportTaskDefinitionArn: Alchemy.Output<string, never>;
    heartbeatTaskDefinitionArn: Alchemy.Output<string, never>;
}, NoInfer<import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | AWS.Providers | AWS.Region>>;
export default _default;
