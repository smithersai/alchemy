export const alchemyProfileFromEnv = (): string | undefined =>
  process.env.ALCHEMY_PROFILE || undefined;
