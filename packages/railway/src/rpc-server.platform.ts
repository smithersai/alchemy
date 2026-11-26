import { RPC_TOKEN_ENV } from "./rpc-token.ts";

/** The host's RPC token ({@link RPC_TOKEN_ENV}); `""` when unset. */
export const rpcTokenFromEnv = () => process.env[RPC_TOKEN_ENV] ?? "";
