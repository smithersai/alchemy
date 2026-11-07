# Pinned toolchain archives

The root workspace and teaching chapters install these exact compiler, runtime, and bundler packages. The archives are tracked so a fresh checkout can run `pnpm install --frozen-lockfile`.

`archives.json` records each archive's SHA-256 hash and package integrity. Keep the archive files, package manifests, and lockfile aligned when updating a toolchain pin.
