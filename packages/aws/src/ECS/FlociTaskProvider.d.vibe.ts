/** @effect-diagnostics anyUnknownInErrorContext:off */
import { Task } from "./Task.js";
export declare const FlociTaskProvider: () => import("effect/Layer").Layer<import("alchemy").Provider<Task>, never, import("alchemy").AlchemyContext | import("alchemy/Artifacts").ArtifactStore | import("effect/Scope").Scope | import("alchemy").Stack>;
