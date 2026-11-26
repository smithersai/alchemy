import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

const TARGET_FILES = [
  "packages/alchemy/src/Auth/OidcToken.vibe",
  "packages/cloudflare/src/StateStore/CredentialsFile.vibe",
  "packages/cloudflare/src/StateStore/State.vibe",
  "packages/domain/src/Saga.vibe",
  "packages/domain/src/Telemetry.vibe",
  "packages/neon/src/FunctionTriggerEvent.vibe",
  "packages/neon/src/LanguageModel.vibe",
];

function findMutableSchemaFields(source) {
  const lines = source.split("\n");
  const mutable = [];
  let inSchema = false;
  let depth = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (
      /^\s*(?:export\s+)?schema\s+\w+/.test(line) &&
      !/^\s*(?:export\s+)?schema\s+error\b/.test(line) &&
      line.includes("{")
    ) {
      inSchema = true;
      depth = 0;
    }
    if (!inSchema) continue;
    for (const ch of line) {
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
    }
    const trimmed = line.trim();
    if (
      depth > 0 &&
      !/^(?:export\s+)?schema\s/.test(trimmed) &&
      !trimmed.startsWith("//") &&
      !trimmed.startsWith("/*") &&
      !trimmed.startsWith("*")
    ) {
      const fieldRe = /(?:^|[{;,]\s*)(readonly\s+)?([A-Za-z_$][\w$]*)\??\s*:/g;
      let m;
      while ((m = fieldRe.exec(trimmed)) !== null) {
        if (!m[1]) mutable.push(`line ${i + 1}: ${m[2]}`);
      }
    }
    if (depth <= 0) inSchema = false;
  }
  return mutable;
}

void test("all #287 schema declarations retain readonly on every field", () => {
  const failures = [];
  for (const rel of TARGET_FILES) {
    const source = readFileSync(join(root, rel), "utf8");
    const mutable = findMutableSchemaFields(source);
    if (mutable.length > 0) failures.push(`${rel}: ${mutable.join(", ")}`);
  }
  assert.deepEqual(failures, []);
});
