import type * as SVC from "@distilled.cloud/aws/codebuild";
import * as Binding from "alchemy/Binding";
import type * as Effect from "effect/Effect";
import type { Project } from "./Project.vibe";
/**
 * Runtime binding for `codebuild:StopBuild` — stops an in-progress build
 * of the bound project by build id.
 * ### Stopping Builds
 * **Example:** Stop a Running Build
 * ```typescript
 * const stopBuild = yield* AWS.CodeBuild.StopBuild(project);
 *
 * const { build } = yield* stopBuild({ id: buildId });
 * // build.buildStatus transitions to "STOPPED"
 * ```
 *
 * @binding
 */
export interface StopBuild extends Binding.Service<StopBuild, "AWS.CodeBuild.StopBuild", <P extends Project>(project: P) => Effect.Effect<(request: SVC.StopBuildInput) => Effect.Effect<SVC.StopBuildOutput, SVC.StopBuildError>>> {
}
export declare const StopBuild: StopBuild;
