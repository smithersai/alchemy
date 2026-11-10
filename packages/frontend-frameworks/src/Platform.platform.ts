// Intentionally duplicated from alchemy's Util/PlatformServices.ts: this
// package must not depend on "alchemy", and the message names this package.
export const importPlatformPeer = <A>(
  peerDependency: "@effect/platform-bun" | "@effect/platform-node",
  load: () => Promise<A>,
): Promise<A> =>
  load().catch(() => {
    console.error(
      [
        `"@alchemy.run/cloudflare-frameworks" could not load its peer dependency "${peerDependency}".`,
        `Install a compatible version of "${peerDependency}" alongside "@alchemy.run/cloudflare-frameworks".`,
      ].join("\n"),
    );
    process.exit(1);
  });

/** `true` when the process does not run on Bun. */
export const bunIsUndefined = (): boolean => typeof Bun === "undefined";
