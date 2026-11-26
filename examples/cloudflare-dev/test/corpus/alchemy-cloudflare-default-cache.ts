/** Exercise the Worker-specific default cache alongside the standard named cache API. */
export async function defaultCache(request: Request, response: Response) {
  await caches.default.put(request, response);
  const cached = await caches.default.match(request);
  await caches.default.delete(request);
  const named = await caches.open("named");
  return { cached, named };
}
