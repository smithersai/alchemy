/** A web `Response` with the given body and status. */
export const webResponse = (body: string | null, status: number): Response =>
  new Response(body, { status });
