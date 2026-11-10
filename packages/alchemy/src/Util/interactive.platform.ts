export const processArgv = (): string[] => process.argv;

export const processEnv = (): NodeJS.ProcessEnv => process.env;

export const stdinIsTTY = (): boolean | undefined => process.stdin.isTTY;

export const stdoutIsTTY = (): boolean | undefined => process.stdout.isTTY;
