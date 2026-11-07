import * as Contributions from "alchemy/Contributions";

export default Contributions.make({
  name: "fly",
  auth: Contributions.lazy(
    () => import("./AuthProvider.vibe"),
    (module) => module.FlyAuth,
  ),
});
