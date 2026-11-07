import * as Effect from "effect/Effect";
export declare const lastSegment: (value: string) => string;
export declare const organizationOf: (explicit: string | undefined, existing: string | undefined, project: string) => string;
export declare const orgParent: (organization: string) => string;
export declare const organizationFromName: (name: string | undefined) => string | undefined;
export declare const toResourceId: (id: string, explicit: string | undefined, existing: string | undefined, maxLength: number) => Effect.Effect<string, never, import("alchemy/ResourceContext").ResourceContext | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export declare const sameJson: (left: unknown, right: unknown) => boolean;
export declare const sameStringList: (left: readonly string[] | undefined, right: readonly string[] | undefined) => boolean;
