import type { StateStoreImpl, StateStoreLifecycle } from "alchemy/Contributions";
/**
 * The DynamoDB state store's lifecycle, for `Alchemist.State` and
 * `alchemy state`. The store also creates its table on first use, so
 * bootstrapping is only needed to provision it ahead of time.
 */
export declare const lifecycle: StateStoreLifecycle;
/** The state store AWS contributes, as `--backend aws`. */
export declare const stateStore: StateStoreImpl;
