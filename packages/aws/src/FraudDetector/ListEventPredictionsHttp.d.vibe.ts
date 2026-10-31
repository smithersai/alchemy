import * as Layer from "effect/Layer";
import { ListEventPredictions } from "./ListEventPredictions.js";
/**
 * Bespoke implementation — unlike the other detector-scoped operations, the
 * detector is a `FilterCondition` (`{ value }`) rather than a plain
 * `detectorId` field, and `frauddetector:ListEventPredictions` supports no
 * resource-level IAM scoping, so the grant is on `*`.
 */
export declare const ListEventPredictionsHttp: Layer.Layer<ListEventPredictions, never, never>;
