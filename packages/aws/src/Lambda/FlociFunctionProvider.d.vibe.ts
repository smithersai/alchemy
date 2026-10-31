/** @effect-diagnostics anyUnknownInErrorContext:off */
import { Function } from "./Function.js";
export declare const FlociFunctionProvider: () => import("effect/Layer").Layer<import("alchemy").Provider<Function>, never, import("alchemy").AlchemyContext | import("alchemy/Artifacts").ArtifactStore | import("effect/Scope").Scope | import("alchemy").Stack>;
