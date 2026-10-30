import parser from "vibelang/eslint";

// typescript-eslint refuses TypeScript 7, which this repository pins, so only the VibeLang parser and core rules run here.
export default [
  { ignores: ["**/node_modules/**", "**/dist/**", "**/build/**"] },
  { files: ["**/*.vibe"], languageOptions: { parser }, rules: { "no-debugger": "error" } },
];
