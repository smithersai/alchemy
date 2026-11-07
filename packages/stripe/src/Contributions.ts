import * as Contributions from "alchemy/Contributions";

export default Contributions.make({
  name: "stripe",
  auth: Contributions.lazy(
    () => import("./AuthProvider.vibe"),
    (module) => module.StripeAuth,
  ),
});
