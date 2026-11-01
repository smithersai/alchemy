/** The app's own Effect HTTP endpoints. */
import * as HttpApiEndpoint from "effect/http-api/HttpApiEndpoint";
import * as HttpApiGroup from "effect/http-api/HttpApiGroup";
import { Unauthorized } from "./auth.js";
/** Who am I. Signed-in only. */
export declare const Me: HttpApiEndpoint.HttpApiEndpoint<"me", "GET", "/api/v1/me", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly id: import("effect/Schema").String;
    readonly name: import("effect/Schema").optional<import("effect/Schema").String>;
}>>, import("effect/Schema").toCodecJson<typeof Unauthorized>, never, never>;
declare const AppRoutes_base: HttpApiGroup.HttpApiGroup<"app", HttpApiEndpoint.HttpApiEndpoint<"me", "GET", "/api/v1/me", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly id: import("effect/Schema").String;
    readonly name: import("effect/Schema").optional<import("effect/Schema").String>;
}>>, import("effect/Schema").toCodecJson<typeof Unauthorized>, never, never>, false>;
export declare class AppRoutes extends AppRoutes_base {
}
export {};
