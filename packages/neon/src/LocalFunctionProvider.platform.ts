import { moduleExtension } from "alchemy/Util/Node";
// Generated platform helpers for this VibeLang module.
import { Effect } from "effect";
/** @throws {never} */
export function $platform() {
  return Effect.sync(() =>
    Object.fromEntries(
      ["PATH", "HOME", "TMPDIR", "SystemRoot"].flatMap((key) =>
        process.env[key] ? [[key, process.env[key]!]] : [],
      ),
    ),
  );
}

/** @throws {never} */
export function localFunctionModule(): string {
  return import.meta.resolve(`./LocalFunction${moduleExtension(import.meta.url)}`);
}
