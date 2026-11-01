import * as HttpApi from "effect/http-api/HttpApi";
import * as HttpApiEndpoint from "effect/http-api/HttpApiEndpoint";
import * as HttpApiGroup from "effect/http-api/HttpApiGroup";
import * as Schema from "effect/Schema";
import { Authentication } from "./middleware.js";
declare const Public_base: HttpApiGroup.HttpApiGroup<"public", HttpApiEndpoint.HttpApiEndpoint<"health", "GET", "/api/health", never, never, never, never, Schema.toCodecJson<Schema.Struct<{
    readonly ok: Schema.Literal<true>;
}>>, never, never, never> | HttpApiEndpoint.HttpApiEndpoint<"providers", "GET", "/api/providers", never, never, never, never, Schema.toCodecJson<Schema.Struct<{
    readonly github: Schema.Boolean;
}>>, never, never, never>, false>;
export declare class Public extends Public_base {
}
declare const Private_base: HttpApiGroup.HttpApiGroup<"private", HttpApiEndpoint.HttpApiEndpoint<"me", "GET", "/api/me", never, never, never, never, Schema.toCodecJson<Schema.Struct<{
    readonly id: Schema.String;
    readonly name: Schema.String;
    readonly email: Schema.String;
}>>, never, Authentication, never>, false>;
export declare class Private extends Private_base {
}
declare const Api_base: HttpApi.HttpApi<"app", typeof Public | typeof Private>;
export declare class Api extends Api_base {
}
export {};
