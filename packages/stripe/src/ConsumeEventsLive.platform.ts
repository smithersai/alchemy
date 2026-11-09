export function response(body: BodyInit | null, init: ResponseInit): Response {
  return new Response(body, init);
}
