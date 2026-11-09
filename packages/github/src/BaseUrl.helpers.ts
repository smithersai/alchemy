import { withBaseUrl as make } from "./BaseUrl.ts";

/** @throws {never} */
export function withBaseUrl(baseUrl: string | undefined): ReturnType<typeof make> {
  return make(baseUrl);
}
