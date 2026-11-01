// The platform code of ToEcsTask.vibe, which a .vibe file does not import as a value (EK4402).

import { createHash } from "node:crypto";
import type { EventBus } from "./EventBus.vibe";
import { type RuleProps } from "./Rule.vibe";

interface EventDescriptor {
  id?: string;
  bus?: EventBus;
  pattern: Record<string, any>;
  props?: Pick<RuleProps, "description" | "state">;
}
export const createRouteId = (descriptor: EventDescriptor, suffix: string) =>
  `EventBridge${createHash("sha1")
    .update(
      JSON.stringify({
        bus: descriptor.bus?.LogicalId ?? "default",
        pattern: descriptor.pattern,
        suffix,
      }),
    )
    .digest("hex")
    .slice(0, 10)}`;
