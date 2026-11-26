// Host Buffer access for the VibeLang module beside this file.
export const bufferFromString = (value: string, encoding: BufferEncoding) =>
  Buffer.from(value, encoding);
