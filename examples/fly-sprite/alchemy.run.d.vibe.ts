import * as Fly from "@alchemy.run/fly";
/**
 * A Fly.io Sprite that exercises the Platform class form:
 *
 * - `Box` — HTTP Sprite (`src/box.ts`)
 *
 * A Sprite is org-scoped. There is no parent App. Alchemy bundles
 * `main` and runs it on the Sprite. Auth is FLY_API_TOKEN.
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    spriteId: Alchemy.Output<string, never>;
    name: Alchemy.Output<string, never>;
    url: Alchemy.Output<string, never>;
    status: Alchemy.Output<Fly.SpriteStatus, never>;
    urlAuth: Alchemy.Output<Fly.UrlAuth, never>;
}, NoInfer<Fly.Providers>>;
export default _default;
