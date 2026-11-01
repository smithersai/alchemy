import * as HttpApi from "effect/http-api/HttpApi";
import * as HttpApiEndpoint from "effect/http-api/HttpApiEndpoint";
import * as HttpApiGroup from "effect/http-api/HttpApiGroup";
import * as HttpApiSchema from "effect/http-api/HttpApiSchema";
import * as Schema from "effect/Schema";
declare const Note_base: Schema.Class<Note, Schema.Struct<{
    readonly id: Schema.String;
    readonly title: Schema.String;
    readonly source: Schema.String;
    readonly createdAt: Schema.Number;
}>, {}>;
export declare class Note extends Note_base {
}
declare const NotesList_base: Schema.Class<NotesList, Schema.Struct<{
    readonly notes: Schema.$Array<typeof Note>;
}>, {}>;
export declare class NotesList extends NotesList_base {
}
export declare const listNotes: HttpApiEndpoint.HttpApiEndpoint<"listNotes", "GET", "/notes", never, never, never, never, Schema.toCodecJson<typeof NotesList>, never, never, never>;
export declare const createNote: HttpApiEndpoint.HttpApiEndpoint<"createNote", "POST", "/notes", never, never, Schema.toCodecJson<Schema.Struct<{
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
}>, never, never>>, never, never, never>;
export declare const deleteNote: HttpApiEndpoint.HttpApiEndpoint<"deleteNote", "DELETE", "/notes/:id", Schema.toCodecStringTree<Schema.Struct<{
    readonly id: Schema.String;
}>>, never, never, never, Schema.toCodecJson<HttpApiSchema.NoContent>, never, never, never>;
declare const BackendGroup_base: HttpApiGroup.HttpApiGroup<"Backend", HttpApiEndpoint.HttpApiEndpoint<"createNote", "POST", "/notes", never, never, Schema.toCodecJson<Schema.Struct<{
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
}>, never, never>>, never, never, never> | HttpApiEndpoint.HttpApiEndpoint<"deleteNote", "DELETE", "/notes/:id", Schema.toCodecStringTree<Schema.Struct<{
    readonly id: Schema.String;
}>>, never, never, never, Schema.toCodecJson<HttpApiSchema.NoContent>, never, never, never> | HttpApiEndpoint.HttpApiEndpoint<"listNotes", "GET", "/notes", never, never, never, never, Schema.toCodecJson<typeof NotesList>, never, never, never>, false>;
export declare class BackendGroup extends BackendGroup_base {
}
declare const BackendApi_base: HttpApi.HttpApi<"BackendApi", typeof BackendGroup>;
/** Backend Worker HttpApi — D1 only. KV lives on the vinext frontend. */
export declare class BackendApi extends BackendApi_base {
}
export {};
