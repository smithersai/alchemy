import * as HttpApi from "effect/http-api/HttpApi";
import * as HttpApiEndpoint from "effect/http-api/HttpApiEndpoint";
import * as HttpApiGroup from "effect/http-api/HttpApiGroup";
import * as Schema from "effect/Schema";
declare const Greeting_base: Schema.Class<Greeting, Schema.Struct<{
    readonly message: Schema.String;
}>, {}>;
export declare class Greeting extends Greeting_base {
}
export declare const hello: HttpApiEndpoint.HttpApiEndpoint<"hello", "GET", "/", never, never, never, never, Schema.toCodecJson<typeof Greeting>, never, never, never>;
declare const HelloGroup_base: HttpApiGroup.HttpApiGroup<"Hello", HttpApiEndpoint.HttpApiEndpoint<"hello", "GET", "/", never, never, never, never, Schema.toCodecJson<typeof Greeting>, never, never, never>, false>;
export declare class HelloGroup extends HelloGroup_base {
}
declare const BackendApi_base: HttpApi.HttpApi<"BackendApi", typeof HelloGroup>;
export declare class BackendApi extends BackendApi_base {
}
export {};
