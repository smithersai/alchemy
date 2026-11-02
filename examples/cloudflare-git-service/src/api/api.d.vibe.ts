/** The application owns the API, including Git's groups and its middleware. */
import * as Git from "@alchemy.run/git";
import * as HttpApi from "effect/http-api/HttpApi";
import { Unauthorized } from "./auth.ts";
import { Authentication } from "./middleware.ts";
declare const AppApi_base: HttpApi.HttpApi<"app", import("effect/http-api/HttpApiGroup").HttpApiGroup<"app", import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"me", "GET", "/api/v1/me", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly id: import("effect/Schema").String;
    readonly name: import("effect/Schema").optional<import("effect/Schema").String>;
}>>, import("effect/Schema").toCodecJson<typeof Unauthorized>, Authentication, never>, false> | import("effect/http-api/HttpApiGroup").HttpApiGroup<"protocol", import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"infoRefs", "GET", "/:owner/:repo/info/refs", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, import("effect/Schema").toCodecJson<typeof Git.PushDenied | typeof Git.RepoNotFound>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"receivePack", "POST", "/:owner/:repo/git-receive-pack", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, import("effect/Schema").toCodecJson<typeof Git.PushDenied | typeof Git.RepoNotFound>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"uploadPack", "POST", "/:owner/:repo/git-upload-pack", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, import("effect/Schema").toCodecJson<typeof Git.PushDenied | typeof Git.RepoNotFound>, Authentication, never>, true> | import("effect/http-api/HttpApiGroup").HttpApiGroup<"refs", import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"list", "GET", "/api/v1/repos/:owner/:repo/refs", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly prefix: import("effect/Schema").optional<import("effect/Schema").String>;
}>>, never, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly head: import("effect/Schema").NullOr<import("effect/Schema").String>;
    readonly refs: import("effect/Schema").$Array<typeof Git.Ref>;
}>>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"get", "GET", "/api/v1/repos/:owner/:repo/ref", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly name: import("effect/Schema").String;
}>>, never, never, import("effect/Schema").toCodecJson<typeof Git.Ref>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.RefNotFound>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"remove", "DELETE", "/api/v1/repos/:owner/:repo/ref", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly name: import("effect/Schema").String;
}>>, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly expectedOid: import("effect/Schema").optional<import("effect/Schema").brand<import("effect/Schema").String, "Oid">>;
}>>, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, import("effect/Schema").toCodecJson<typeof Git.ReadOnlyRepo | typeof Git.PushDenied | typeof Git.RepoNotFound | typeof Git.RefNotFound | typeof Git.RefConflict>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"update", "PUT", "/api/v1/repos/:owner/:repo/ref", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly name: import("effect/Schema").String;
}>>, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly newOid: import("effect/Schema").brand<import("effect/Schema").String, "Oid">;
    readonly expectedOid: import("effect/Schema").optional<import("effect/Schema").NullOr<import("effect/Schema").brand<import("effect/Schema").String, "Oid">>>;
}>>, never, import("effect/Schema").toCodecJson<typeof Git.Ref>, import("effect/Schema").toCodecJson<typeof Git.ReadOnlyRepo | typeof Git.PushDenied | typeof Git.RepoNotFound | typeof Git.RefConflict | typeof Git.ObjectNotFound>, Authentication, never>, false> | import("effect/http-api/HttpApiGroup").HttpApiGroup<"pulls", import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"list", "GET", "/api/v1/repos/:owner/:repo/pulls", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly state: import("effect/Schema").optional<import("effect/Schema").Literals<readonly ["open", "closed", "merged", "all"]>>;
    readonly cursor: import("effect/Schema").optional<import("effect/Schema").String>;
    readonly limit: import("effect/Schema").optional<import("effect/Schema").Int>;
}>>, never, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly items: import("effect/Schema").$Array<typeof Git.Pull>;
    readonly nextCursor: import("effect/Schema").NullOr<import("effect/Schema").String>;
    readonly hasMore: import("effect/Schema").Boolean;
}>>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"get", "GET", "/api/v1/repos/:owner/:repo/pulls/:number", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
    readonly number: import("effect/Schema").Int;
}>>, never, never, never, import("effect/Schema").toCodecJson<typeof Git.PullDetail>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.PullNotFound>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"update", "PATCH", "/api/v1/repos/:owner/:repo/pulls/:number", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
    readonly number: import("effect/Schema").Int;
}>>, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly title: import("effect/Schema").optional<import("effect/Schema").String>;
    readonly body: import("effect/Schema").optional<import("effect/Schema").NullOr<import("effect/Schema").String>>;
    readonly state: import("effect/Schema").optional<import("effect/Schema").Literals<readonly ["open", "closed"]>>;
}>>, never, import("effect/Schema").toCodecJson<typeof Git.Pull>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.PullNotFound | typeof Git.PullStateConflict>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"create", "POST", "/api/v1/repos/:owner/:repo/pulls", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly title: import("effect/Schema").String;
    readonly body: import("effect/Schema").optional<import("effect/Schema").String>;
    readonly base: import("effect/Schema").String;
    readonly head: import("effect/Schema").String;
}>>, never, import("effect/Schema").toCodecJson<typeof Git.Pull>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.ValidationError | typeof Git.BranchMissing | typeof Git.PullExists>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"merge", "POST", "/api/v1/repos/:owner/:repo/pulls/:number/merge", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
    readonly number: import("effect/Schema").Int;
}>>, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly message: import("effect/Schema").optional<import("effect/Schema").String>;
    readonly expectedHeadOid: import("effect/Schema").optional<import("effect/Schema").brand<import("effect/Schema").String, "Oid">>;
}>>, never, import("effect/Schema").toCodecJson<typeof Git.MergeResult>, import("effect/Schema").toCodecJson<typeof Git.ReadOnlyRepo | typeof Git.PushDenied | typeof Git.RepoNotFound | typeof Git.RefConflict | typeof Git.PullNotFound | typeof Git.BranchMissing | typeof Git.PullStateConflict | typeof Git.NothingToMerge | typeof Git.MergeConflict>, Authentication, never>, false> | import("effect/http-api/HttpApiGroup").HttpApiGroup<"objects", import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"blobRaw", "GET", "/api/v1/repos/:owner/:repo/blobs/:oid/raw", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"file", "GET", "/api/v1/repos/:owner/:repo/file", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"log", "GET", "/api/v1/repos/:owner/:repo/log", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly ref: import("effect/Schema").optional<import("effect/Schema").String>;
    readonly cursor: import("effect/Schema").optional<import("effect/Schema").String>;
    readonly limit: import("effect/Schema").optional<import("effect/Schema").Int>;
}>>, never, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly items: import("effect/Schema").$Array<typeof Git.CommitInfo>;
    readonly nextCursor: import("effect/Schema").NullOr<import("effect/Schema").String>;
    readonly hasMore: import("effect/Schema").Boolean;
}>>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.RefNotFound>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"commit", "GET", "/api/v1/repos/:owner/:repo/commits/:oid", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
    readonly oid: import("effect/Schema").brand<import("effect/Schema").String, "Oid">;
}>>, never, never, never, import("effect/Schema").toCodecJson<typeof Git.CommitInfo>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.ObjectNotFound | typeof Git.WrongObjectType>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"diff", "GET", "/api/v1/repos/:owner/:repo/commits/:oid/diff", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
    readonly oid: import("effect/Schema").brand<import("effect/Schema").String, "Oid">;
}>>, never, never, never, import("effect/Schema").toCodecJson<typeof Git.CommitDiff>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.ObjectNotFound | typeof Git.WrongObjectType>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"tree", "GET", "/api/v1/repos/:owner/:repo/trees/:oid", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
    readonly oid: import("effect/Schema").brand<import("effect/Schema").String, "Oid">;
}>>, never, never, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly oid: import("effect/Schema").brand<import("effect/Schema").String, "Oid">;
    readonly entries: import("effect/Schema").$Array<typeof Git.TreeEntry>;
}>>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.ObjectNotFound | typeof Git.WrongObjectType>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"blob", "GET", "/api/v1/repos/:owner/:repo/blobs/:oid", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
    readonly oid: import("effect/Schema").brand<import("effect/Schema").String, "Oid">;
}>>, never, never, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly oid: import("effect/Schema").brand<import("effect/Schema").String, "Oid">;
    readonly size: import("effect/Schema").Number;
    readonly encoding: import("effect/Schema").Literals<readonly ["base64"]>;
    readonly content: import("effect/Schema").String;
}>>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.ObjectNotFound | typeof Git.WrongObjectType | typeof Git.ObjectTooLarge>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"compare", "GET", "/api/v1/repos/:owner/:repo/compare", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly base: import("effect/Schema").String;
    readonly head: import("effect/Schema").String;
}>>, never, never, import("effect/Schema").toCodecJson<typeof Git.Comparison>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.RefNotFound | typeof Git.ObjectNotFound | typeof Git.WrongObjectType | typeof Git.NoMergeBase>, Authentication, never>, false> | import("effect/http-api/HttpApiGroup").HttpApiGroup<"repos", import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"list", "GET", "/api/v1/repos", never, import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").optional<import("effect/Schema").String>;
    readonly public: import("effect/Schema").optional<import("effect/Schema").Boolean>;
    readonly cursor: import("effect/Schema").optional<import("effect/Schema").String>;
    readonly limit: import("effect/Schema").optional<import("effect/Schema").Int>;
}>>, never, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly items: import("effect/Schema").$Array<typeof Git.Repo>;
    readonly nextCursor: import("effect/Schema").NullOr<import("effect/Schema").String>;
    readonly hasMore: import("effect/Schema").Boolean;
}>>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"compact", "POST", "/api/v1/repos/:owner/:repo/compact", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"delete", "DELETE", "/api/v1/repos/:owner/:repo", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"get", "GET", "/api/v1/repos/:owner/:repo", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, never, never, never, import("effect/Schema").toCodecJson<typeof Git.Repo>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"update", "PATCH", "/api/v1/repos/:owner/:repo", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly description: import("effect/Schema").optional<import("effect/Schema").NullOr<import("effect/Schema").String>>;
    readonly defaultBranch: import("effect/Schema").optional<import("effect/Schema").String>;
    readonly readOnly: import("effect/Schema").optional<import("effect/Schema").Boolean>;
    readonly public: import("effect/Schema").optional<import("effect/Schema").Boolean>;
}>>, never, import("effect/Schema").toCodecJson<typeof Git.Repo>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.RefNotFound>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"import", "POST", "/api/v1/repos/import", never, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly name: import("effect/Schema").String;
    readonly source: import("effect/Schema").Struct<{
        readonly url: import("effect/Schema").String;
        readonly ref: import("effect/Schema").optional<import("effect/Schema").String>;
        readonly depth: import("effect/Schema").optional<import("effect/Schema").Int>;
    }>;
}>>, never, import("effect/Schema").toCodecJson<typeof Git.RepoCreated>, import("effect/Schema").toCodecJson<typeof Git.RepoAlreadyExists | typeof Git.ImportFailed>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"create", "POST", "/api/v1/repos", never, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly name: import("effect/Schema").String;
    readonly defaultBranch: import("effect/Schema").optional<import("effect/Schema").String>;
    readonly description: import("effect/Schema").optional<import("effect/Schema").String>;
    readonly public: import("effect/Schema").optional<import("effect/Schema").Boolean>;
    readonly readOnly: import("effect/Schema").optional<import("effect/Schema").Boolean>;
}>>, never, import("effect/Schema").toCodecJson<typeof Git.RepoCreated>, import("effect/Schema").toCodecJson<typeof Git.RepoAlreadyExists | typeof Git.ValidationError>, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"fork", "POST", "/api/v1/repos/:owner/:repo/fork", import("effect/Schema").toCodecStringTree<import("effect/Schema").Struct<{
    readonly owner: import("effect/Schema").String;
    readonly repo: import("effect/Schema").String;
}>>, never, import("effect/Schema").toCodecJson<import("effect/Schema").Struct<{
    readonly targetOwner: import("effect/Schema").String;
    readonly targetName: import("effect/Schema").String;
}>>, never, import("effect/Schema").toCodecJson<typeof Git.RepoCreated>, import("effect/Schema").toCodecJson<typeof Git.RepoNotFound | typeof Git.RepoAlreadyExists | typeof Git.RepoNotReady>, Authentication, never>, false> | import("effect/http-api/HttpApiGroup").HttpApiGroup<"github", import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"branches", "GET", "/api/v3/repos/:owner/:repo/branches", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"commit", "GET", "/api/v3/repos/:owner/:repo/commits/:sha", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"commits", "GET", "/api/v3/repos/:owner/:repo/commits", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"contents", "GET", "/api/v3/repos/:owner/:repo/contents/*", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"createPull", "POST", "/api/v3/repos/:owner/:repo/pulls", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"mergePull", "PUT", "/api/v3/repos/:owner/:repo/pulls/:number/merge", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"pull", "GET", "/api/v3/repos/:owner/:repo/pulls/:number", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"pullFiles", "GET", "/api/v3/repos/:owner/:repo/pulls/:number/files", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"pulls", "GET", "/api/v3/repos/:owner/:repo/pulls", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"repo", "GET", "/api/v3/repos/:owner/:repo", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"updatePull", "PATCH", "/api/v3/repos/:owner/:repo/pulls/:number", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never> | import("effect/http-api/HttpApiEndpoint").HttpApiEndpoint<"user", "GET", "/api/v3/user", never, never, never, never, import("effect/Schema").toCodecJson<import("effect/http-api/HttpApiSchema").NoContent>, never, Authentication, never>, false>>;
export declare class AppApi extends AppApi_base {
}
export declare const MeLive: import("effect/Layer").Layer<import("effect/http-api/HttpApiGroup").Service<"app", "app">, never, Authentication>;
export {};
