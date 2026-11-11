import * as Contributions from "alchemy/Contributions";

export default Contributions.make({
  name: "github",
  auth: Contributions.lazy(
    () => import("./AuthProvider.vibe"),
    (module) => module.GitHubAuth,
  ),
});
