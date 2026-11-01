import type { StateStoreImpl, StateStoreLifecycle } from "alchemy/Contributions";
/**
 * The Cloud Storage state store's lifecycle, for `alchemy state`. The store
 * also creates its bucket on first use, so bootstrapping is only needed to
 * provision it ahead of time (CI).
 */
export declare const lifecycle: StateStoreLifecycle;
/** The state store GCP contributes. */
export declare const stateStore: StateStoreImpl;
