import { Schema } from "effect";
import { Runtime, type Update } from "foldkit";
import type { Document, HtmlBuilder } from "foldkit/html";
export declare const Model: Schema.Struct<{
    readonly count: Schema.Number;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedDecrement: {};
    readonly ClickedIncrement: {};
    readonly ClickedReset: {};
}>;
export type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly count: number;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedDecrement";
    } | {
        readonly _tag: "ClickedIncrement";
    } | {
        readonly _tag: "ClickedReset";
    }, never> | undefined;
    outMessage?: never;
}>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
