import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
  copyFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const modules = ["InstanceId", "Util/md5", "Util/AtomicFile"];
for (const name of modules) {
  void test(name + " keeps its host operations behind a cold platform boundary", () => {
    const temporary = mkdtempSync(join(root, ".vibelang-toolchain/host-boundary-"));
    try {
      symlinkSync(
        join(root, "packages/alchemy/node_modules"),
        join(temporary, "node_modules"),
        "dir",
      );
      const destination = join(temporary, name + ".vibe");
      mkdirSync(dirname(destination), { recursive: true });
      const native = join(root, "packages/alchemy/src", name + ".vibe");
      const retained = join(root, "packages/alchemy/src", name + ".ts");
      writeFileSync(destination, readFileSync(existsSync(native) ? native : retained));
      const platform = join(root, "packages/alchemy/src", name + ".platform.ts");
      if (existsSync(platform)) copyFileSync(platform, join(temporary, name + ".platform.ts"));
      writeFileSync(
        join(temporary, "tsconfig.json"),
        JSON.stringify({
          compilerOptions: {
            strict: true,
            skipLibCheck: true,
            target: "ESNext",
            module: "Preserve",
            moduleResolution: "Bundler",
            types: ["bun"],
            noEmit: true,
            allowImportingTsExtensions: true,
            allowArbitraryExtensions: true,
          },
          files: [name + ".vibe"],
        }),
      );
      const checked = spawnSync(
        join(root, "node_modules/.bin/vibelang"),
        ["-p", join(temporary, "tsconfig.json"), "--pretty", "false"],
        { cwd: root, encoding: "utf8", timeout: 120000 },
      );
      assert.ifError(checked.error);
      assert.equal(checked.status, 0, checked.stdout + checked.stderr);
    } finally {
      rmSync(temporary, { recursive: true, force: true });
    }
  });
}
