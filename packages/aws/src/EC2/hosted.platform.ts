/** Base64 of the user data string, as EC2's `UserData` field expects. */
export const encodeUserData = (userData: string): string =>
  Buffer.from(userData).toString("base64");
