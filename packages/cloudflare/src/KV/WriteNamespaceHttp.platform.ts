/** Whether `value` is a web `Blob`. */
export const isBlob = (value: unknown): value is Blob => value instanceof Blob;

/** Whether `value` is a web `ReadableStream`. */
export const isReadableStream = (value: unknown): value is ReadableStream =>
  value instanceof ReadableStream;

/** A web `Blob` of `parts`. */
export const blobOf = (parts: BlobPart[]): Blob => new Blob(parts);

/** Read a web stream to completion through a `Response`. */
export const readArrayBuffer = (body: ReadableStream): Promise<ArrayBuffer> =>
  new Response(body).arrayBuffer();
