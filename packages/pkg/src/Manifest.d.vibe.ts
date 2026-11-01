import * as Schema from "effect/Schema";
/**
 * An npm package name, scoped or unscoped, under the rules npm applies to
 * new packages: lowercase, URL-safe, at most 214 characters. Names end up
 * in R2 keys, install URLs, and the markdown of comments and check runs,
 * so nothing outside this set is ever accepted from a client.
 */
export declare const PackageName: Schema.String;
/** A display group label for the install comment: `Alchemy`, `@alchemy.run`. */
export declare const GroupName: Schema.String;
/**
 * One packed workspace package inside a `pkg pack` artifact.
 *
 * Everything here is data the CLI observed while packing. The registry never
 * derives a tag from it: every tag comes from the GitHub Actions run that
 * vouched for the manifest, and R2 verifies uploaded tarball bytes against
 * the hash they are stored under.
 */
export declare const ManifestPackage: Schema.Struct<{
    readonly name: Schema.String;
    /** Version from the package manifest at pack time. */
    readonly version: Schema.String;
    /** Package directory relative to the workspace root, POSIX separators. */
    readonly dir: Schema.String;
    readonly group: Schema.String;
    /** Tarball file name inside the artifact directory. */
    readonly file: Schema.String;
    /** Lowercase hex SHA-256 of the tarball bytes. */
    readonly sha256: Schema.String;
    /** Tarball size in bytes. */
    readonly size: Schema.Number;
}>;
export type ManifestPackage = typeof ManifestPackage.Type;
/** A display group in the install comment, in the order `pkg pack` listed it. */
export declare const ManifestGroup: Schema.Struct<{
    readonly name: Schema.String;
    /** Render the group collapsed in the install comment. */
    readonly collapsed: Schema.Boolean;
}>;
export type ManifestGroup = typeof ManifestGroup.Type;
/**
 * The `pkg-manifest.json` written next to the tarballs by `pkg pack` and read
 * back by `pkg publish`.
 */
export declare const Manifest: Schema.Struct<{
    readonly version: Schema.Literal<1>;
    readonly groups: Schema.$Array<Schema.Struct<{
        readonly name: Schema.String;
        /** Render the group collapsed in the install comment. */
        readonly collapsed: Schema.Boolean;
    }>>;
    /** Registry origin the tarball dependencies were rewritten against. */
    readonly registry: Schema.String;
    /**
     * HEAD commit of the root repository at pack time. The registry requires
     * it to be the head of the run that publishes, since that is the commit
     * every tag names.
     */
    readonly head: Schema.String;
    readonly packages: Schema.$Array<Schema.Struct<{
        readonly name: Schema.String;
        /** Version from the package manifest at pack time. */
        readonly version: Schema.String;
        /** Package directory relative to the workspace root, POSIX separators. */
        readonly dir: Schema.String;
        readonly group: Schema.String;
        /** Tarball file name inside the artifact directory. */
        readonly file: Schema.String;
        /** Lowercase hex SHA-256 of the tarball bytes. */
        readonly sha256: Schema.String;
        /** Tarball size in bytes. */
        readonly size: Schema.Number;
    }>>;
}>;
export type Manifest = typeof Manifest.Type;
export declare const ManifestJson: Schema.fromJsonString<Schema.Struct<{
    readonly version: Schema.Literal<1>;
    readonly groups: Schema.$Array<Schema.Struct<{
        readonly name: Schema.String;
        /** Render the group collapsed in the install comment. */
        readonly collapsed: Schema.Boolean;
    }>>;
    /** Registry origin the tarball dependencies were rewritten against. */
    readonly registry: Schema.String;
    /**
     * HEAD commit of the root repository at pack time. The registry requires
     * it to be the head of the run that publishes, since that is the commit
     * every tag names.
     */
    readonly head: Schema.String;
    readonly packages: Schema.$Array<Schema.Struct<{
        readonly name: Schema.String;
        /** Version from the package manifest at pack time. */
        readonly version: Schema.String;
        /** Package directory relative to the workspace root, POSIX separators. */
        readonly dir: Schema.String;
        readonly group: Schema.String;
        /** Tarball file name inside the artifact directory. */
        readonly file: Schema.String;
        /** Lowercase hex SHA-256 of the tarball bytes. */
        readonly sha256: Schema.String;
        /** Tarball size in bytes. */
        readonly size: Schema.Number;
    }>>;
}>>;
export declare const MANIFEST_FILE = "pkg-manifest.json";
