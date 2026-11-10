import { fileURLToPath } from "node:url";
import * as NodeV8 from "node:v8";
import { moduleExtension } from "alchemy/Util/Node";

export { NodeV8 };

// Resolved lazily at spawn time, NOT at module load: this module can be
// carried into bundled user code (Workers), where `import.meta.resolve`
// does not exist (workerd) — a module-level call would crash the bundle
// at startup even though no child is ever spawned there. At spawn time
// we are guaranteed to be in Node/bun.
const resolveRunner = (basename: string) =>
  fileURLToPath(import.meta.resolve(`./${basename}${moduleExtension(import.meta.url)}`));

// The runner for a Node child spawned from Bun. Bun runs a published
// install from `src/*.ts` (the `bun` export condition), but Node can't load
// that: `nodeLoaderArgs` pairs a `.ts` entry with the checkout-only
// `bin/register-dev-mode.js` (not published), and `bin/register-oxc.js`
// leaves `node_modules` untranspiled. The package ships `lib/` beside `src/`,
// so an installed copy hands Node the built runner (loaded under
// `bin/register-oxc.js`); a checkout keeps the source runner.
const resolveNodeRunner = (basename: string) => {
  const runner = resolveRunner(basename);
  return /[\\/]node_modules[\\/]/.test(runner) && runner.endsWith(".ts")
    ? fileURLToPath(new URL(`../../lib/Workers/${basename}.js`, import.meta.url))
    : runner;
};

export { resolveNodeRunner, resolveRunner };

/** `value` as JSON text, encoded as UTF-8 bytes. */
export const jsonBytes = (value: unknown): Buffer => Buffer.from(JSON.stringify(value));

/** The host's `ALCHEMY_PROFILE` environment variable, read now. */
export const alchemyProfileEnv = (): string | undefined => process.env.ALCHEMY_PROFILE;

/** The host process's environment, read now. */
export const processEnv = (): NodeJS.ProcessEnv => process.env;

/** The path of the running JavaScript runtime's executable. */
export const execPath = (): string => process.execPath;

/** Deserialize V8-serialized `bytes`. */
export const deserializeBytes = (bytes: Uint8Array): unknown =>
  NodeV8.deserialize(Buffer.from(bytes));
