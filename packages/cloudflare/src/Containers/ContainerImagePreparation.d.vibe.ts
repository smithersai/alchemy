import type * as Containers from "@distilled.cloud/cloudflare/containers";
import type { ScopedPlanStatusSession } from "alchemy/Report";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import { ContainerImagePreparationError } from "./ContainerConfiguration.js";
/** Wait for Cloudflare preparation, with an interruptible deadline including API calls. */
export declare const waitForContainerImage: <E, R>(options: {
    image: string;
    name: string;
    timeout?: Duration.Input;
    prepare: Effect.Effect<Containers.PrepareContainerImageResponse, E, R>;
    session: Pick<ScopedPlanStatusSession, "note">;
}) => Effect.Effect<void, E | import("./ContainerConfiguration.js").ContainerConfigurationError | ContainerImagePreparationError, R>;
