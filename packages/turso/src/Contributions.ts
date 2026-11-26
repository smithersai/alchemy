import * as Contributions from "alchemy/Contributions";

export default Contributions.make({
  name: "turso",
  auth: Contributions.lazy(
    () => import("./AuthProvider.vibe"),
    (module) => module.TursoAuth,
  ),
});
