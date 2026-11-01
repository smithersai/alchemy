import * as Layer from "effect/Layer";
import { PutRumEvents } from "./PutRumEvents.vibe";
/**
 * Bespoke (not `makeRumAppMonitorHttpBinding`): `PutRumEvents` addresses the
 * data-plane endpoint by monitor *id* (not name) and defaults the
 * `AppMonitorDetails` envelope from the bound monitor.
 */
export declare const PutRumEventsHttp: Layer.Layer<PutRumEvents, never, never>;
