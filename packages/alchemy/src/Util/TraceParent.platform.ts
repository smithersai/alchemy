export const traceParentFromEnv = (name: string): string => process.env[name] ?? "";
