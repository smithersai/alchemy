/** Authorization and commit stay in the request effect, across every write transport. */
import * as Git from "@alchemy.run/git";
import * as Effect from "effect/Effect";
export declare const RefsLive: import("effect/Layer").Layer<import("effect/http-api/HttpApiGroup").Service<"app", "refs">, never, Git.Engine | Git.Handlers | (import("./middleware.vibe").Authentication | import("effect/http/HttpRouter").Request<"Requires", import("alchemy").RuntimeContext>)>;
/** Used by both the typed REST endpoint and the GitHub facade. */
export declare const mergePull: (git: Effect.Success<typeof Git.Engine>, params: {
    owner: string;
    repo: string;
    number: number;
}, input: {
    message?: string;
    expectedHeadOid?: string;
}) => Effect.Effect<import("@alchemy.run/git/RepoObject").MergePullResult, Git.BranchMissing | Git.MergeConflict | Git.NothingToMerge | Git.PullNotFound | Git.PullStateConflict | Git.PushDenied | Git.ReadOnlyRepo | Git.RefConflict | Git.RepoNotFound | import("./auth.ts").Unauthorized, import("alchemy").RuntimeContext | import("./auth.ts").Session>;
export declare const PullsLive: import("effect/Layer").Layer<import("effect/http-api/HttpApiGroup").Service<"app", "pulls">, never, Git.Engine | Git.Handlers | (import("./middleware.vibe").Authentication | import("effect/http/HttpRouter").Request<"Requires", import("alchemy").RuntimeContext>)>;
