/** The compatibility endpoint delegates to the same application write operation. */
import * as Git from "@alchemy.run/git";
import * as HttpRouter from "effect/http/HttpRouter";
export declare const GitHubLive: import("effect/Layer").Layer<import("effect/http-api/HttpApiGroup").Service<"app", "github">, never, import("./middleware.ts").Authentication | Git.Engine | Git.Handlers | HttpRouter.Request<"Requires", import("alchemy").RuntimeContext>>;
