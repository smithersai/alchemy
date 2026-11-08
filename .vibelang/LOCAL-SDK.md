# Local VibeLang toolchain

This branch resolves VibeLang 0.0.13 from the checked-in archives in `.vibelang-toolchain/sdk13/`. Their checksums and compiler source revision are recorded in `manifest.json`. An npm release is not required.

Use Node.js 24, Bun 1.4.4 and pnpm 12.15.0. Run `pnpm install --frozen-lockfile` after checking out the repository and its submodules. The normal repository checks and original test commands remain available; the pull request records outstanding migration failures.
