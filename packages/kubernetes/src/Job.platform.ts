export function readEnv(key: string): string | undefined {
  return process.env[key];
}
