import * as HttpApi from "effect/http-api/HttpApi";
import * as HttpApiEndpoint from "effect/http-api/HttpApiEndpoint";
import * as HttpApiGroup from "effect/http-api/HttpApiGroup";
import * as Schema from "effect/Schema";
import { LinkNotFound } from "./Link.js";
declare const ShortyApi_base: HttpApi.HttpApi<"ShortyApi", HttpApiGroup.HttpApiGroup<"links", HttpApiEndpoint.HttpApiEndpoint<"create", "POST", "/links", never, never, Schema.toCodecJson<Schema.Struct<{
    readonly url: Schema.String;
}>>, never, Schema.toCodecJson<Schema.Struct<{
    readonly code: Schema.String;
    readonly url: Schema.String;
    readonly createdAt: Schema.String;
}>>, never, never, never> | HttpApiEndpoint.HttpApiEndpoint<"get", "GET", "/links/:code", Schema.toCodecStringTree<Schema.Struct<{
    readonly code: Schema.String;
}>>, never, never, never, Schema.toCodecJson<Schema.Struct<{
    readonly code: Schema.String;
    readonly url: Schema.String;
    readonly createdAt: Schema.String;
}>>, Schema.toCodecJson<typeof LinkNotFound>, never, never> | HttpApiEndpoint.HttpApiEndpoint<"list", "GET", "/links", never, never, never, never, Schema.toCodecJson<Schema.$Array<Schema.Struct<{
    readonly code: Schema.String;
    readonly url: Schema.String;
    readonly createdAt: Schema.String;
}>>>, never, never, never>, false>>;
export declare class ShortyApi extends ShortyApi_base {
}
export {};
