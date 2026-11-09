export const encodeBase64Url = (value: string): string => Buffer.from(value).toString("base64url");
