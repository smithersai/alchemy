import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const patterns = [
  { module: "OSLogin/internal", name: "parseSshKey", arguments: '"ssh-ed25519 AAAA comment"' },
  { module: "Retail/operations", name: "resourceNameFromOperation", arguments: "{}" },
];
for (const pattern of patterns) {
  void test(pattern.name + " has a native nonthrowing contract in effect code", () => {
    const temporary = mkdtempSync(join(root, ".vibelang-toolchain/gcp-contract-"));
    try {
      symlinkSync(join(root, "packages/gcp/node_modules"), join(temporary, "node_modules"), "dir");
      const base = join(root, "packages/gcp/src", pattern.module);
      const source = base + (existsSync(base + ".vibe") ? ".vibe" : ".ts");
      const specifier = relative(temporary, source).replaceAll("\\", "/");
      writeFileSync(
        join(temporary, "main.vibe"),
        "import { " +
          pattern.name +
          ' } from "' +
          specifier +
          '";\n' +
          "export effect function main() { return " +
          pattern.name +
          "(" +
          pattern.arguments +
          "); }\n",
      );
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
          files: ["main.vibe"],
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
