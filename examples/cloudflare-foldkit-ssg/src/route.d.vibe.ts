import { Schema } from "effect";
import { Route } from "foldkit";
export declare const AppRoute: Route.RouteUnion<{
    readonly Home: {};
    readonly About: {};
    readonly NotFound: {
        path: Schema.String;
    };
}>;
export type AppRoute = typeof AppRoute.Type;
export declare const homeRouter: Route.Router<{
    readonly _tag: "Home";
}>;
export declare const aboutRouter: Route.Router<{
    readonly _tag: "About";
}>;
export declare const prerenderPaths: ReadonlyArray<string>;
export declare const urlToAppRoute: (url: import("foldkit/url").Url) => {
    readonly _tag: "About";
} | {
    readonly _tag: "Home";
} | {
    readonly _tag: "NotFound";
    readonly path: string;
};
