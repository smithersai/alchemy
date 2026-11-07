import * as HttpApi from "effect/http-api/HttpApi";
import * as HttpApiEndpoint from "effect/http-api/HttpApiEndpoint";
import * as HttpApiGroup from "effect/http-api/HttpApiGroup";
import * as Schema from "effect/Schema";
import { LinkNotFound } from "./Links.js";
export declare const LinkView: Schema.Struct<{
    readonly code: Schema.String;
    readonly url: Schema.String;
    readonly createdAt: Schema.Number;
    readonly preview: Schema.optional<Schema.Struct<{
        readonly title: Schema.String;
        readonly fetchedAt: Schema.Number;
    }>>;
    readonly clicks: Schema.Number;
}>;
export type LinkView = typeof LinkView.Type;
declare const LinksGroup_base: HttpApiGroup.HttpApiGroup<"links", HttpApiEndpoint.HttpApiEndpoint<"create", "POST", "/links", never, never, Schema.toCodecJson<Schema.Struct<{
    readonly url: Schema.String;
}>>, never, Schema.toCodecJson<Schema.Struct<{
    readonly code: Schema.String;
    readonly url: Schema.String;
    readonly createdAt: Schema.Number;
    readonly preview: Schema.optional<Schema.Struct<{
        readonly title: Schema.String;
        readonly fetchedAt: Schema.Number;
    }>>;
    readonly clicks: Schema.Number;
}>>, never, never, never> | HttpApiEndpoint.HttpApiEndpoint<"get", "GET", "/links/:code", Schema.toCodecStringTree<Schema.Struct<{
    readonly code: Schema.String;
}>>, never, never, never, Schema.toCodecJson<Schema.Struct<{
    readonly code: Schema.String;
    readonly url: Schema.String;
    readonly createdAt: Schema.Number;
    readonly preview: Schema.optional<Schema.Struct<{
        readonly title: Schema.String;
        readonly fetchedAt: Schema.Number;
    }>>;
    readonly clicks: Schema.Number;
}>>, Schema.toCodecJson<typeof LinkNotFound>, never, never> | HttpApiEndpoint.HttpApiEndpoint<"import", "POST", "/links/import", never, never, Schema.toCodecJson<Schema.Struct<{
    readonly urls: Schema.$Array<Schema.String>;
}>>, never, Schema.toCodecJson<Schema.$Array<Schema.Struct<{
    readonly code: Schema.String;
    readonly url: Schema.String;
    readonly createdAt: Schema.Number;
    readonly preview: Schema.optional<Schema.Struct<{
        readonly title: Schema.String;
        readonly fetchedAt: Schema.Number;
    }>>;
    readonly clicks: Schema.Number;
}>>>, never, never, never> | HttpApiEndpoint.HttpApiEndpoint<"list", "GET", "/links", never, never, never, never, Schema.toCodecJson<Schema.$Array<Schema.Struct<{
    readonly code: Schema.String;
    readonly url: Schema.String;
    readonly createdAt: Schema.Number;
    readonly preview: Schema.optional<Schema.Struct<{
        readonly title: Schema.String;
        readonly fetchedAt: Schema.Number;
    }>>;
    readonly clicks: Schema.Number;
}>>>, never, never, never>, false>;
export declare class LinksGroup extends LinksGroup_base {
}
declare const ShortyApi_base: HttpApi.HttpApi<"ShortyApi", typeof LinksGroup>;
/** The public API: imported by the Worker to serve it and by the dashboard to call it. */
export declare class ShortyApi extends ShortyApi_base {
}
export {};
