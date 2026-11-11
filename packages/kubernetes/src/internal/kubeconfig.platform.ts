export function base64ToUtf8(value: string): string {
  return Buffer.from(value, "base64").toString("utf8");
}

export function utf8ToBase64(value: string): string {
  return Buffer.from(value, "utf8").toString("base64");
}

export function homeFromEnv(): string | undefined {
  return process.env.HOME ?? process.env.USERPROFILE;
}
