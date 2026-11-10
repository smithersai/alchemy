import { pathToFileURL } from "node:url";
import * as Effect from "effect/Effect";

/** The `file:` URL of an absolute path. */
export const fileUrlOf = (path: string): string => pathToFileURL(path).href;

/**
 * The KV data-cache adapter throws during local prerender (no Worker
 * `env`) and vinext may log a wrangler.jsonc snippet. That hint is
 * wrong on the Alchemy path — drop those lines so deploy logs do not
 * look like a missing Wrangler file.
 */
const isWranglerKvHint = (text: string) =>
  text.includes("failed to initialize the configured data cache adapter") ||
  text.includes("Add it to wrangler.jsonc") ||
  (text.includes("KV data cache adapter requires") && text.includes("KV namespace binding")) ||
  text.includes('"kv_namespaces"');

export const withLocalPrerenderLogs = <A, E, R>(
  effect: Effect.Effect<A, E, R>,
): Effect.Effect<A, E, R> =>
  Effect.acquireUseRelease(
    Effect.sync(() => {
      const original = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info,
      };
      const filter =
        (write: typeof console.log) =>
        (...args: Array<unknown>) => {
          const text = args.map((arg) => String(arg)).join(" ");
          if (isWranglerKvHint(text)) return;
          write(...args);
        };
      console.log = filter(original.log);
      console.warn = filter(original.warn);
      console.error = filter(original.error);
      console.info = filter(original.info);
      return original;
    }),
    () => effect,
    (original) =>
      Effect.sync(() => {
        console.log = original.log;
        console.warn = original.warn;
        console.error = original.error;
        console.info = original.info;
      }),
  );
