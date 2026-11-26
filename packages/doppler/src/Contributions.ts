import * as Contributions from "alchemy/Contributions";

export default Contributions.make({
  name: "doppler",
  auth: Contributions.lazy(
    () => import("./AuthProvider.vibe"),
    (module) => module.DopplerAuth,
  ),
});
