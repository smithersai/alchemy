/** @throws {Error} */
export function validateUploadUrl(uploadUrl: string) {
  const parsed = new URL(uploadUrl);
  if (parsed.protocol !== "https:" || parsed.username.length > 0 || parsed.password.length > 0) {
    throw new Error("invalid upload URL");
  }
}
