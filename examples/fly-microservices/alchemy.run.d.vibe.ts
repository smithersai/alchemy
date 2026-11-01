import * as Fly from "@alchemy.run/fly";
/**
 * Three Services connected over a private Fly network:
 *
 * - `Users` — private, serves `list` and `get` methods (`src/users.ts`)
 * - `Orders` — private, binds Users (`src/orders.ts`)
 * - `Gateway` — the only public Service, binds both (`src/gateway.ts`)
 *
 * Each Service is its own Fly App. All three join `Fly.stackNetwork`, a
 * private network unique to this stack and stage, so Users and Orders are
 * unreachable from the internet and from every other App in the org.
 * `Fly.bindService` connects them: only a Service that binds another
 * receives its caller token, so it can call its methods.
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    network: Alchemy.Output<string | undefined, never>;
    usersUrl: Alchemy.Output<string | undefined, never>;
    usersPrivateUrl: Alchemy.Output<string | undefined, never>;
    ordersPrivateUrl: Alchemy.Output<string | undefined, never>;
}, NoInfer<Fly.Providers>>;
export default _default;
