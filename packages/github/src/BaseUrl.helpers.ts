import { withBaseUrl as make } from "./BaseUrl.vibe";

/** @throws {never} */
export function withBaseUrl(baseUrl: string | undefined): ReturnType<typeof make> {
  return make(baseUrl);
}
