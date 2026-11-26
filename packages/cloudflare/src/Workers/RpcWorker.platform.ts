/** The host's `new Request(url, init)`. */
export const makeRequest = (url: string, init: RequestInit): Request => new Request(url, init);

/** The host's `new Headers(init)`. */
export const makeHeaders = (init: HeadersInit): Headers => new Headers(init);
