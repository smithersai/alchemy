/**
 * The AWS provider group served by the dev sidecar (see
 * `Local/Sidecar.ts`): the floci-backed local providers, whose long-lived
 * state — `Bundle.watch` loops hot-swapping Lambda code into the emulator,
 * ECS image watch loops rebuilding and restarting task containers —
 * survives exec-process hot reloads during `alchemy dev`. Built per session
 * the first time a stack asks for one of their types, so a stack without
 * AWS resources never starts the emulator. Mirrors
 * [Cloudflare/Local.ts](../../Cloudflare/Local.ts).
 */
import * as Layer from "effect/Layer";
declare const _default: Layer.Layer<import("alchemy").Provider<import("../Lambda/Function.js").Function> | import("alchemy").Provider<import("../Lambda/MicrovmImage.js").MicrovmImage> | import("alchemy").Provider<import("../ECS/Service.js").Service> | import("alchemy").Provider<import("../ECS/Task.js").Task>, never, import("alchemy").AlchemyContext | import("alchemy/Artifacts").ArtifactStore | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | import("effect/Path").Path | import("effect/Scope").Scope | import("alchemy").Stack>;
export default _default;
