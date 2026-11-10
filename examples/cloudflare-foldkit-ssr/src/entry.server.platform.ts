/** The answer to a preflight: no body, and the methods the host forwards. */
export const preflightResponse = (allow: string): Response =>
  new Response(null, {
    status: 204,
    headers: { allow },
  });
