import type { ProviderMode } from "alchemy/ProviderMode";
import { type ResourceLike } from "alchemy/Resource";
import type { AIGatewayProps } from "./AIGateway.vibe";
type CredentialScope = Pick<AIGatewayProps, "branch" | "project">;
export declare const scopeIdentity: (scope: CredentialScope) => string | undefined;
/** Unknown scope identity falls back to a managed credential. */
export declare const usesInjectedCredentials: (host: Pick<ResourceLike, "Type" | "Props" | "Mode"> | undefined, target: CredentialScope, defaultMode: ProviderMode) => boolean;
export {};
