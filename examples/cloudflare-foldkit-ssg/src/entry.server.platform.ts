/** The answer for a path the app has no route for. */
export const notFoundResponse = (): Response => new Response("Not Found", { status: 404 });

/** The answer for a method other than GET or HEAD: the pages are static. */
export const methodNotAllowedResponse = (): Response =>
  new Response(null, { status: 405, headers: { allow: "GET, HEAD" } });
