import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as SqlClient from "effect/sql/SqlClient";
export declare const TagRow: Schema.Struct<{
    readonly package: Schema.String;
    readonly tag: Schema.String;
    readonly sha256: Schema.String;
    readonly expires_at: Schema.Number;
    /** Pull requests whose runs produced this tag, as `owner/repo#N`. */
    readonly linked_prs: Schema.fromJsonString<Schema.$Array<Schema.String>>;
}>;
export type TagRow = typeof TagRow.Type;
export declare const get: (pkg: string, tag: string) => Effect.Effect<{
    readonly package: string;
    readonly tag: string;
    readonly sha256: string;
    readonly expires_at: number;
    readonly linked_prs: readonly string[];
}, Schema.SchemaError | import("effect/sql/SqlError").SqlError, SqlClient.SqlClient>;
/**
 * Point `tag` at `sha256`, keeping the row alive for at least `expiresAt`
 * and remembering every pull request that produced it. One statement, so
 * concurrent publications of a shared tag merge rather than overwrite.
 */
export declare const upsert: (input: {
    readonly package: string;
    readonly tag: string;
    readonly sha256: string;
    readonly expiresAt: number;
    readonly prs: ReadonlyArray<string>;
}) => Effect.Effect<void, Schema.SchemaError | import("effect/sql/SqlError").SqlError, SqlClient.SqlClient>;
export declare const resolve: (pkg: string, tag: string) => Effect.Effect<string, Schema.SchemaError | import("effect/sql/SqlError").SqlError, SqlClient.SqlClient>;
/** Rows tied to pull requests whose expiry falls before `before`. */
export declare const dueLinked: (before: number) => Effect.Effect<readonly {
    readonly package: string;
    readonly tag: string;
    readonly sha256: string;
    readonly expires_at: number;
    readonly linked_prs: readonly string[];
}[], Schema.SchemaError | import("effect/sql/SqlError").SqlError, SqlClient.SqlClient>;
export declare const setExpiry: (pkg: string, tag: string, expiresAt: number) => Effect.Effect<void, import("effect/sql/SqlError").SqlError, SqlClient.SqlClient>;
/** Delete every expired row and return the tarballs those rows pointed at. */
export declare const deleteExpired: (now: number) => Effect.Effect<readonly {
    readonly package: string;
    readonly sha256: string;
}[], Schema.SchemaError | import("effect/sql/SqlError").SqlError, SqlClient.SqlClient>;
/** Every tarball some tag still points at, as `<package>/<sha256>`. */
export declare const referencedTarballs: () => Effect.Effect<Set<string>, Schema.SchemaError | import("effect/sql/SqlError").SqlError, SqlClient.SqlClient>;
