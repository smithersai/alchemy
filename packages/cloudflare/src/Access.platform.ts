/** The host's global `fetch`, called when the returned function runs. */
export const hostFetch = (...args: Parameters<typeof fetch>): Promise<Response> => fetch(...args);
