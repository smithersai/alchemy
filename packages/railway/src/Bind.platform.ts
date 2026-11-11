import { unpackEnvValue } from "alchemy/RuntimeContext";
import { RPC_TOKEN_HEADER } from "./rpc-token.ts";

/** The string value of a host environment variable, unpacked; `""` when absent. */
export const fromProcessEnv = (key: string): string => {
  const unpacked = unpackEnvValue<unknown>(process.env[key]);
  if (typeof unpacked === "string") return unpacked;
  return "";
};

/** POST a JSON RPC body to `url` with the host token, timing out after 25 seconds. */
export const postRpc = (url: string, token: string, body: string) =>
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      [RPC_TOKEN_HEADER]: token,
    },
    body,
    signal: AbortSignal.timeout(25_000),
  });
