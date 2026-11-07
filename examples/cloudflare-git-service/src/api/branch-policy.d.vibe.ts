/** Application policy, shared by push, REST ref writes, and pull merges. */
import * as Git from "@alchemy.run/git";
import * as Effect from "effect/Effect";
import { Session, Unauthorized } from "./auth.ts";
export declare const checkRefChanges: (repo: Git.RepoMetaData, updates: ReadonlyArray<Git.RefUpdate>) => Effect.Effect<undefined, Git.PushDenied | Unauthorized, Session>;
