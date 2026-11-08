import type * as Cloudflare from "@alchemy.run/cloudflare";
import type { ProviderServices, Stack } from "alchemy/Stack";
import type * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import type Observed from "./ChatObserved.ts";
import type Preview from "./ChatPreview.ts";
import type Traced from "./ChatTraced.ts";
import type { History } from "./History.ts";
import type Room from "./Room.ts";
import type { RoomLive } from "./Room.ts";

type Assert<T extends true> = T;
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

// A chat room captures History at construction, and exposes a typed namespace.
type RoomDependencies = Assert<Equal<Layer.Services<typeof RoomLive>, Cloudflare.Worker | History>>;
type RoomService = Assert<Equal<Layer.Success<typeof RoomLive>, Room>>;

// Preview configuration reads the surrounding stack before constructing its Worker.
type PreviewDependencies = Effect.Services<typeof Preview>;
type PreviewReadsStack = Assert<Stack extends PreviewDependencies ? true : false>;
type PreviewHasNoOtherServices = Assert<
  Equal<Exclude<PreviewDependencies, Stack | ProviderServices>, never>
>;

// Every composition variant must provide the room implementation.
type ObservedHasNoCustomServices = Assert<
  Equal<Exclude<Effect.Services<typeof Observed>, ProviderServices>, never>
>;
type TracedHasNoCustomServices = Assert<
  Equal<Exclude<Effect.Services<typeof Traced>, ProviderServices>, never>
>;
