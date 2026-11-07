import { Schema as S } from "effect";
import type { Runtime, Update } from "foldkit";
import type { Document, HtmlBuilder } from "foldkit/html";
export declare const Model: S.Struct<{}>;
export type Model = typeof Model.Type;
export type Message = never;
export declare const update: (model: Model, _message: Message) => Update.Return<Model, Message>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const view: (_model: Model, h: HtmlBuilder<Message>) => Document;
