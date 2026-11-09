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

## Generated declarations

The compiler writes `*.d.vibe.ts` beside native modules so stock TypeScript tools
can resolve their types. These files are build caches rather than tracked source.
`pnpm install` generates them during `prepare`; `pnpm sidecars` recreates deleted
caches in dependency order using a separate incremental emit cache. Full type
checking remains in `pnpm typecheck`. The helper
preserves project emit options and builds shared runtime outputs
before generating declarations.

Standalone lint and API-documentation commands generate declarations first.
Run `pnpm test:vibelang-tools` for the migration regressions, including seeded
stock-TypeScript consumers that exercise initial generation, an unchanged build,
and regeneration after deleting the cache. Packages that publish source continue
to include the generated declarations in their existing source directories.

The website reference command generates native declaration sidecars before reading
API documentation. A direct generator invocation reports a missing sidecar with
the source name and the preparation command, so an incomplete cache cannot
silently remove a reference page. `pnpm docs:check` and the website build share
this preparation path.

Provider guards that call a foreign predicate run it in an Effect boundary.
The guarded callback returns the narrowed value, so the continuation can use its
resolved type. A missing prior output still short-circuits before inspecting
props, and getter or Proxy failures keep their original defect identity.

Trace JSON parsing uses an Effect boundary after file reading, so filesystem
and parsing failures retain their original order.
