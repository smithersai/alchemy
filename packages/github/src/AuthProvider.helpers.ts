import { AuthProviderLayer, refreshHint as providerRefreshHint } from "alchemy/Auth/AuthProvider";

/** @throws {never} */
export function authProviderLayer<Config extends { method: string }, Credentials>(): ReturnType<
  typeof AuthProviderLayer<Config, Credentials>
> {
  return AuthProviderLayer<Config, Credentials>();
}

/** @throws {never} */
export function refreshHint(provider: string, profileName: string): string {
  return providerRefreshHint(provider, profileName);
}
