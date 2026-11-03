# VibeLang tooling

The shared package builder keeps inline TypeScript module implementations private.
Package exports point at the public facade; the facade can still use relative
imports of its generated implementation.

For named modules, the builder reads the compiler's syntax tree and excludes the
implementation's exact subpaths. It supports the current filename spelling and
VIP-40's encoded spelling. Comments and strings that mention a module declaration
do not create exclusions. Authored neighbouring modules remain public. A
collision with an authored source or an explicit public export fails the build
rather than hiding that module.

After installing workspace dependencies, check the Node, Bun and type-resolution
behaviour with:

    node --test .vibelang/inline-module-privacy.test.mjs .vibelang/inline-module-named-privacy.test.mjs

The tests cover development and published exports, source-only conditions,
nested paths, Unicode module names and relative imports through public facades.

`pnpm exports:check` validates the generated maps without writing manifests or consulting version control. It also checks quoted private package references in authored package source and examples, including `.vibe` files. Use `pnpm exports:sync` to write updated maps.
