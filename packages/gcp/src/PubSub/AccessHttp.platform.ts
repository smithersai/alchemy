// Host Buffer access for the VibeLang module beside this file.
export const bufferFromString = (value: string, encoding: BufferEncoding) =>
  Buffer.from(value, encoding);

export const bufferFromBytes = (bytes: Uint8Array) =>
  Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
