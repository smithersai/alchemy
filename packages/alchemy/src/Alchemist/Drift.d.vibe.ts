import type * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as EngineDrift from "../Drift.js";
import type { Plan } from "../Plan.js";
import type { ConfiguredStack } from "../Stack.js";
import type { State } from "../State/State.js";
import { type BuildOptions, type PlanSummary } from "./Operations.js";
export interface DriftedResource {
    readonly fqn: string;
    readonly logicalId: string;
    readonly resourceType: string;
    /** `skipped`: not checked (no `read`, or an interrupted deploy); see `reason`. */
    readonly status: "in-sync" | "drifted" | "missing" | "skipped";
    readonly reason?: string;
    readonly actual?: unknown;
}
/** A drift check and the repair it proposes; only {@link execute} runs it. */
export interface DriftScan {
    readonly stack: {
        readonly name: string;
        readonly stage: string;
    };
    readonly resources: ReadonlyArray<DriftedResource>;
    /** What the repair would change. */
    readonly summary: PlanSummary;
    /**
     * The repair as an engine plan, for renderers.
     * @internal its shape may change.
     */
    readonly native: Plan;
    /**
     * The stack services drift was checked under.
     * @internal {@link execute} runs in them.
     */
    readonly context: Context.Context<State>;
}
export interface ScanOptions extends BuildOptions {
    readonly stack: ConfiguredStack<unknown, unknown>;
}
/** Whether the drift check found anything worth repairing. */
export declare const hasDrift: (scan: DriftScan) => boolean;
/**
 * Compare deployed state against the real cloud and plan the repair. Drift
 * reads state and providers only, so the stack's program never runs.
 */
export declare const scan: (input: ScanOptions) => Effect.Effect<{
    stack: {
        name: string;
        stage: string;
    };
    resources: {
        fqn: string;
        logicalId: string;
        resourceType: string;
        status: "drifted" | "in-sync" | "missing" | "skipped";
        reason: string | undefined;
        actual: any;
    }[];
    summary: PlanSummary;
    native: Plan;
    context: Context.Context<import("../AdoptPolicy.js").AdoptPolicy | import("../AlchemyContext.js").AlchemyContext | import("../Artifacts.js").ArtifactStore | import("../index.js").AuthProviders | import("../Stack.js").Stack | import("../Stage.js").Stage | State>;
}, any, import("../AlchemyContext.js").AlchemyContext | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("../Auth/Credentials.js").CredentialsStore | import("effect/crypto/Digest").Digest | import("effect/FileSystem").FileSystem | import("effect/http/HttpClient").HttpClient | import("../Interaction.js").Interaction | import("effect/Path").Path | import("../Auth/Profile.js").ProfileStore | import("effect/Scope").Scope | import("effect/crypto/SecureRandom").SecureRandom>;
/**
 * Repair the drift `scan` found: reconcile each drifted or missing resource
 * back to its last-deployed desired state. Only those resources are touched;
 * they are re-read first, so one that is back in sync is left alone, and
 * drift that appeared after the scan waits for the next one.
 */
export declare const execute: (scan: DriftScan) => Effect.Effect<EngineDrift.DriftResult, any, never>;
