import * as Fly from "@alchemy.run/fly";
/**
 * A Fly.io app that exercises the full module-scope graph:
 *
 * - `Site` — parent App (`src/shared.ts`)
 * - `Marker` — App Secret the Api reads via `Fly.GetSecret`
 * - `PublicIp` — shared IPv4 so `{app}.fly.dev` answers
 * - `Api` — HTTP Service on port 3000 (`src/api.ts`)
 * - `Worker` — background Service that writes a volume marker (`src/worker.ts`)
 *
 * N Services share one App; each Service is its own Machine. Disks are
 * `Fly.MountVolume({ path, sizeGb })` inside the Service — one Volume
 * per replica, not a standalone Volume resource.
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    appName: Alchemy.Output<string, never>;
    appId: Alchemy.Output<string, never>;
    appUrl: Alchemy.Output<string, never>;
    workerMounts: Alchemy.Output<Fly.MountedDisk[], never>;
    secretName: Alchemy.Output<string, never>;
    ip: Alchemy.Output<string, never>;
    workerMachineId: Alchemy.Output<string, never>;
    workerName: Alchemy.Output<string, never>;
    workerState: Alchemy.Output<string, never>;
    apiMachineId: Alchemy.Output<string, never>;
    apiName: Alchemy.Output<string, never>;
    apiState: Alchemy.Output<string, never>;
    apiUrl: Alchemy.Output<string | undefined, never>;
    apiRegion: Alchemy.Output<string, never>;
}, NoInfer<Fly.Providers>>;
export default _default;
