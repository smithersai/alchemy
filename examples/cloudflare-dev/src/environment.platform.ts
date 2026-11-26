/** Reads a variable from the host process environment. */
export const readEnvironment = (name: string): string | undefined => process.env[name];
