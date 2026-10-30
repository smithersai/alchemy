import tseslint from "typescript-eslint";
import parser from "vibelang/eslint";
export default [
  { ignores: ["**/node_modules/**", "**/dist/**", "**/build/**"] },
  ...tseslint.configs.recommended.map((config) => ({ ...config, files: ["**/*.vibe"] })),
  { files: ["**/*.vibe"], languageOptions: { parser }, rules: { "no-debugger": "error" } },
];
