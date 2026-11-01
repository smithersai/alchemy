// The platform code of ScheduleEventSource.vibe, which a .vibe file does not import as a value (EK4402).

import { createHash } from "node:crypto";
import type { Function as LambdaFunction } from "../Lambda/Function.ts";
import type { ScheduleDescriptor } from "./ScheduleEventSource.vibe";

/**
 * Derive the stable route id for a schedule descriptor: the explicit id when
 * given, otherwise a hash of the expression and the host Function's logical
 * id. Computed identically at deploy time (to name the backing resources) and
 * at runtime (to match incoming events to the handler).
 */
export const createScheduleRouteId = (descriptor: ScheduleDescriptor, fn: LambdaFunction): string =>
  descriptor.id ??
  `Scheduler${createHash("sha1")
    .update(
      JSON.stringify({
        expression: descriptor.expression,
        host: fn.LogicalId,
      }),
    )
    .digest("hex")
    .slice(0, 10)}`;
