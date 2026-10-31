import * as Contributions from "alchemy/Contributions";

export default Contributions.make({
  name: "neon",
  auth: Contributions.lazy(
    () => import("./AuthProvider.vibe"),
    (module) => module.NeonAuth,
  ),
});
