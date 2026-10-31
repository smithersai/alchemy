import * as Schema from "effect/Schema";
export declare const RateLimitProps: Schema.Struct<{
    readonly binding: Schema.String;
    readonly namespaceId: Schema.String;
    readonly simple: Schema.Struct<{
        readonly limit: Schema.Number;
        readonly period: Schema.Number;
    }>;
}>;
export type RateLimitProps = typeof RateLimitProps.Type;
