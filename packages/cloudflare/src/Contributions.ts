import * as Contributions from "alchemy/Contributions";

export default Contributions.make({
  name: "cloudflare",
  auth: Contributions.lazy(
    () => import("./Auth/AuthProvider.vibe"),
    (module) => module.CloudflareAuth,
  ),
  stateStores: {
    cloudflare: {
      description: "State-store Worker in the profile's Cloudflare account",
      load: Contributions.lazy(
        () => import("./Alchemist/StateStore.vibe"),
        (module) => module.stateStore,
      ),
    },
  },
  cli: {
    provider: {
      description: "Manage Cloudflare provider prerequisites",
      load: Contributions.lazy(
        () => import("./Cli.vibe"),
        (module) => module.cloudflareCommand,
      ),
    },
  },
});
