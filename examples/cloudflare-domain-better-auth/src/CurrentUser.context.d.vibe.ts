import * as Schema from "effect/Schema";
declare const CurrentUser_base: import("@alchemy.run/domain/RequestContext").RequestContextClass<CurrentUser, "Notes/CurrentUser", Schema.Struct<{
    readonly userId: Schema.brand<Schema.String, "UserId">;
    readonly name: Schema.String;
}>>;
/** The signed-in user behind a request. */
export declare class CurrentUser extends CurrentUser_base {
}
export {};
