/** The answer for a path the app has no route for. */
export const notFoundResponse = (): Response => new Response("Not Found", { status: 404 });
