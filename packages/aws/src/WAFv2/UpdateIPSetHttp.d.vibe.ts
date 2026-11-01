import * as Layer from "effect/Layer";
import { UpdateIPSet } from "./UpdateIPSet.vibe";
/**
 * Bespoke (multi-op) binding: reads the IP set for a fresh `LockToken`,
 * applies the full-replacement update, and retries optimistic-lock
 * conflicts by re-reading.
 */
export declare const UpdateIPSetHttp: Layer.Layer<UpdateIPSet, never, never>;
