/** @effect-diagnostics anyUnknownInErrorContext:off */
import { Service } from "./Service.js";
export declare const FlociServiceProvider: () => import("effect/Layer").Layer<import("alchemy").Provider<Service>, never, import("alchemy").AlchemyContext | import("alchemy/Artifacts").ArtifactStore | import("effect/Scope").Scope | import("alchemy").Stack>;
