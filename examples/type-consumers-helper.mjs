import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const root = dirname(dirname(fileURLToPath(import.meta.url)));
const testRequire = createRequire(join(root, "packages/alchemy-test/package.json"));
export const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");

export function checkConsumers(project, source, extension = ".ts") {
  const directory = join(root, "examples", project);
  const parent = join(directory, ".vibelang-toolchain");
  mkdirSync(parent, { recursive: true });
  const dir = mkdtempSync(join(parent, "typed-consumers-"));
  try {
    const binary = join(root, "node_modules/.bin/vibelang");
    const shown = spawnSync(
      binary,
      ["--showConfig", "-p", join(directory, "tsconfig.json"), "--pretty", "false"],
      { cwd: root, encoding: "utf8", timeout: 30000, maxBuffer: 8 * 1024 * 1024 },
    );
    assert.ifError(shown.error);
    assert.equal(shown.status, 0, (shown.stdout ?? "") + (shown.stderr ?? ""));
    const config = JSON.parse(shown.stdout);
    const input = join(dir, "consumer" + extension);
    writeFileSync(input, source.replaceAll(root + "/", relative(dir, root) + "/"));
    writeFileSync(
      join(dir, "tsconfig.json"),
      JSON.stringify({
        extends: join(directory, "tsconfig.json"),
        compilerOptions: { rootDir: root, noEmit: true },
        include: [],
        files: [input],
        references: (config.references ?? []).map(({ path }) => ({
          path: resolve(directory, path),
        })),
      }),
    );
    const result = spawnSync(binary, ["-p", join(dir, "tsconfig.json"), "--pretty", "false"], {
      cwd: root,
      encoding: "utf8",
      timeout: 110000,
      maxBuffer: 16 * 1024 * 1024,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, (result.stdout ?? "") + (result.stderr ?? ""));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
