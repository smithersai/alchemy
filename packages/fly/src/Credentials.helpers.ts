import { lazyCredentials as make } from "alchemy/Auth/Resolve";

/** @throws {never} */
export function lazyCredentials<Resolved, E>() {
  return make<Resolved, E>();
}
