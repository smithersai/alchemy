/** Whether `value` is a web `ReadableStream`. */
export const isReadableStream = (value: unknown): value is ReadableStream<any> =>
  value instanceof ReadableStream;
