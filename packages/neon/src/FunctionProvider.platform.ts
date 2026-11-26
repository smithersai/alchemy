export function functionZip(bytes: Uint8Array<ArrayBuffer>): File {
  return new File([bytes], "function.zip", {
    type: "application/zip",
  });
}
