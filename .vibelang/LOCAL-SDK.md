# Local VibeLang toolchain

This branch resolves VibeLang 0.0.13 from the checked-in archives in `.vibelang-toolchain/sdk13/`. Their checksums and compiler source revision are recorded in `manifest.json`. An npm release is not required.

Use Node.js 24, Bun 1.4.4 and pnpm 12.15.0. Run `pnpm install --frozen-lockfile` after checking out the repository and its submodules. The normal repository checks and original test commands remain available; the pull request records outstanding migration failures.

The runtime archive includes the source-built CommonJS entry fix from b891a427578303a1d11e437ac0b519056e3d018c. It preserves the original release metadata and declaration bytes; its six changed generated files and two source hashes are recorded in the manifest. The compiler and other SDK archives retain their original producer. This is a local patched runtime build, rather than an unchanged npm archive.

The unplugin archive also carries the source-built declaration bundling fix from
`bab67612c675541fa08997d1c6afd71cd4b58a1c`. Its four changed JavaScript sources,
original archive checksum and replacement archive checksum are recorded in the
manifest. The compiler and public declaration files retain their release bytes. The
unplugin metadata declares the backport's required `magic-string` and
`@jridgewell/remapping` dependencies. This local backport lets declaration bundlers follow native
type exports without changing the runtime module graph.
