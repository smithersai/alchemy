import * as Fly from "@alchemy.run/fly";
import * as Effect from "effect/Effect";
declare const Orders_base: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy").ResourceLike<"Fly.Service", Fly.ServiceProps, {
    rolloutPending?: boolean;
    appName: string;
    ownsApp?: boolean;
    network?: string;
    rpcToken?: import("effect/Redacted").Redacted<string>;
    machineId: string;
    machineIds: string[];
    baseName?: string;
    name: string;
    region: string;
    regions: string[];
    state: string;
    url: string | undefined;
    endpoints: Fly.ServiceEndpoint[];
    privateUrl: string | undefined;
    imageRef: Fly.MachineImageRef | undefined;
    count: number;
    mounts: Fly.MountedDisk[];
    replicas: Fly.Replica[];
    code: {
        hash: string;
    };
}, Fly.ServiceBinding, Fly.Providers> & {
    bind(sid: import("alchemy").Input<string>, binding: import("alchemy").Input<Fly.ServiceBinding>): Effect.Effect<void>;
    bind(template: TemplateStringsArray, ...args: any[]): (binding: import("alchemy").Input<Fly.ServiceBinding>) => Effect.Effect<void>;
} & {
    rolloutPending: import("alchemy").Output<boolean | undefined, never>;
    appName: import("alchemy").Output<string, never>;
    ownsApp: import("alchemy").Output<boolean | undefined, never>;
    network: import("alchemy").Output<string | undefined, never>;
    rpcToken: import("alchemy").Output<import("effect/Redacted").Redacted<string> | undefined, never>;
    machineId: import("alchemy").Output<string, never>;
    machineIds: import("alchemy").Output<string[], never>;
    baseName: import("alchemy").Output<string | undefined, never>;
    name: import("alchemy").Output<string, never>;
    region: import("alchemy").Output<string, never>;
    regions: import("alchemy").Output<string[], never>;
    state: import("alchemy").Output<string, never>;
    url: import("alchemy").Output<string | undefined, never>;
    endpoints: import("alchemy").Output<Fly.ServiceEndpoint[], never>;
    privateUrl: import("alchemy").Output<string | undefined, never>;
    imageRef: import("alchemy").Output<Fly.MachineImageRef | undefined, never>;
    count: import("alchemy").Output<number, never>;
    mounts: import("alchemy").Output<Fly.MountedDisk[], never>;
    replicas: import("alchemy").Output<Fly.Replica[], never>;
    code: import("alchemy/Output").ObjectExpr<{
        hash: string;
    }, never>;
} & import("alchemy").Rpc<Orders>, never, Fly.Providers> & import("alchemy").Named<"Orders"> & import("alchemy").PlatformIdentity<"Orders"> & (new (_: never) => {
    list: () => Effect.Effect<{
        id: string;
        userId: string;
        item: string;
        user: import("./users.vibe").User | undefined;
    }[], never, never>;
} & import("alchemy").Named<"Orders"> & import("alchemy/Named").Tag<"Fly.Service">);
/**
 * Private Service that calls {@link Users} through a binding. Binding
 * `Users` makes Orders deploy after it and hands Orders a typed client.
 */
export default class Orders extends Orders_base {
}
export {};
