import * as elbv2 from "@distilled.cloud/aws/elastic-load-balancing-v2";
import * as Effect from "effect/Effect";
/** The tags on one ELBv2 resource, as a record. */
export declare const readElbTags: (resourceArn: string) => Effect.Effect<Record<string, string>, elbv2.DescribeTagsError, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
