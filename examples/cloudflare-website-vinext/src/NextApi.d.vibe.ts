import * as HttpApi from "effect/http-api/HttpApi";
import * as HttpApiEndpoint from "effect/http-api/HttpApiEndpoint";
import * as HttpApiGroup from "effect/http-api/HttpApiGroup";
import * as HttpApiSchema from "effect/http-api/HttpApiSchema";
import * as Schema from "effect/Schema";
import { Note, NotesList } from "./BackendApi.vibe";
declare const Hello_base: Schema.Class<Hello, Schema.Struct<{
    readonly message: Schema.String;
    readonly noteCount: Schema.Number;
}>, {}>;
export declare class Hello extends Hello_base {
}
declare const KvValue_base: Schema.Class<KvValue, Schema.Struct<{
    readonly value: Schema.NullOr<Schema.String>;
}>, {}>;
export declare class KvValue extends KvValue_base {
}
declare const KvOk_base: Schema.Class<KvOk, Schema.Struct<{
    readonly ok: Schema.Boolean;
}>, {}>;
export declare class KvOk extends KvOk_base {
}
declare const FrontendApi_base: HttpApi.HttpApi<"FrontendApi", HttpApiGroup.HttpApiGroup<"frontend", HttpApiEndpoint.HttpApiEndpoint<"createNote", "POST", "/api/notes", never, never, Schema.toCodecJson<Schema.Struct<{
    readonly title: Schema.String;
}>>, never, Schema.toCodecJson<Schema.decodeTo<Schema.declareConstructor<Note, {
    readonly id: string;
    readonly title: string;
    readonly source: string;
    readonly createdAt: number;
}, readonly [Schema.Struct<{
    readonly id: Schema.String;
    readonly title: Schema.String;
    readonly source: Schema.String;
    readonly createdAt: Schema.Number;
}>], {
    readonly id: string;
    readonly title: string;
    readonly source: string;
    readonly createdAt: number;
}>, Schema.Struct<{
    readonly id: Schema.String;
    readonly title: Schema.String;
    readonly source: Schema.String;
    readonly createdAt: Schema.Number;
}>, never, never>>, never, never, never> | HttpApiEndpoint.HttpApiEndpoint<"deleteNote", "DELETE", "/api/notes/:id", Schema.toCodecStringTree<Schema.Struct<{
    readonly id: Schema.String;
}>>, never, never, never, Schema.toCodecJson<HttpApiSchema.NoContent>, never, never, never> | HttpApiEndpoint.HttpApiEndpoint<"getKv", "GET", "/api/kv/:key", Schema.toCodecStringTree<Schema.Struct<{
    readonly key: Schema.String;
}>>, never, never, never, Schema.toCodecJson<typeof KvValue>, never, never, never> | HttpApiEndpoint.HttpApiEndpoint<"hello", "GET", "/api/hello", never, never, never, never, Schema.toCodecJson<typeof Hello>, never, never, never> | HttpApiEndpoint.HttpApiEndpoint<"listNotes", "GET", "/api/notes", never, never, never, never, Schema.toCodecJson<typeof NotesList>, never, never, never> | HttpApiEndpoint.HttpApiEndpoint<"putKv", "PUT", "/api/kv/:key", Schema.toCodecStringTree<Schema.Struct<{
    readonly key: Schema.String;
}>>, never, Schema.toCodecJson<Schema.String>, never, Schema.toCodecJson<Schema.decodeTo<Schema.declareConstructor<KvOk, {
    readonly ok: boolean;
}, readonly [Schema.Struct<{
    readonly ok: Schema.Boolean;
}>], {
    readonly ok: boolean;
}>, Schema.Struct<{
    readonly ok: Schema.Boolean;
}>, never, never>>, never, never, never>, true>>;
export declare class FrontendApi extends FrontendApi_base {
}
export {};
