@AGENTS.md

<!-- vibelang agents: start. `npx vibelang agents init` writes this section; rerun it to update. -->
## VibeLang

`.vibe` files are VibeLang: Effect programs in TypeScript syntax. Load the `vibelang` skill (`.agents/skills/vibelang/SKILL.md`) before you write or review one.

- After you edit `.vibe` files, run `npx vibelang agents check <file>...`. It applies `vibelang --fix` and prints each diagnostic left; fix every error before you finish. Claude Code, Codex and opencode run it for you after each edit and show you the result.
- `npx vibelang --noEmit` checks the whole project. Each `EKxxxx` diagnostic says how to fix it.
- `npx vibelang lint` runs the built-in Effect type-aware rules on `.vibe` files using the repository’s Oxlint configuration; pass `-c <config>` for a non-default config. Run it before finishing a change.
<!-- vibelang agents: end -->
