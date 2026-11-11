/** Fetch `path` resolved against a server's base URL with the host's `fetch`. */
export const fetchAt = (url: URL, path: string, init?: RequestInit): Promise<Response> =>
  fetch(new URL(path, url), init);
