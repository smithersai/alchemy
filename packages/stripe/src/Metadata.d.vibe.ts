import { Stack } from "alchemy/Stack";
import { type Tags } from "alchemy/Tags";
import * as Effect from "effect/Effect";
/**
 * Stripe metadata keys may only contain alphanumeric characters, dashes,
 * and underscores (max 40 chars). Alchemy ownership tags use `alchemy::stack`
 * / `alchemy::stage` / `alchemy::id` — map those onto `alchemy_stack` /
 * `alchemy_stage` / `alchemy_id` so they survive the Stripe API.
 */
export declare const ALCHEMY_METADATA_PREFIX = "alchemy_";
export declare const alchemyMetadataKeys: {
    readonly stack: "alchemy_stack";
    readonly stage: "alchemy_stage";
    readonly id: "alchemy_id";
};
export declare const toMetadataKey: (tagKey: string) => string;
export declare const toTagKey: (metadataKey: string) => string;
/** Stripe metadata values are capped at 500 characters. */
export declare const sanitizeMetadataValue: (value: string) => string;
export declare const toMetadata: (tags: Record<string, string> | null | undefined) => Record<string, string>;
export declare const fromMetadata: (metadata: Record<string, string> | null | undefined) => Record<string, string>;
export declare const createInternalMetadata: (id: string) => Effect.Effect<Record<string, string>, never, Stack | import("alchemy/Stage").Stage>;
export declare const stripInternalMetadata: (metadata: Record<string, string> | null | undefined) => Record<string, string>;
export declare const hasAlchemyMetadata: (id: string, metadata: Tags | undefined) => Effect.Effect<boolean, never, Stack | import("alchemy/Stage").Stage>;
/**
 * Diff observed Stripe metadata against desired metadata. Always pass
 * **observed** metadata as `oldTags` — never `olds.metadata` or
 * `output.metadata` — so adoption converges.
 */
export declare const diffMetadata: (oldTags: Record<string, string>, newTags: Record<string, string>) => {
    added: {
        Key: string;
        Value: string;
    }[];
    removed: string[];
    updated: {
        Key: string;
        Value: string;
    }[];
    upsert: {
        Key: string;
        Value: string;
    }[];
};
/**
 * Stripe Search query matching Alchemy-owned objects on the current stack.
 * Example: `metadata["alchemy_stack"]:"Nuke"`
 *
 * `list()` for nuke must still enumerate every object whose metadata has
 * `alchemy_stack` (account-wide), not only the current stack name.
 */
export declare const alchemyStackSearchQuery: () => Effect.Effect<string, never, Stack>;
