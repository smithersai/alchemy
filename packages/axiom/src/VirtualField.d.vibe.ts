import * as Axiom from "@distilled.cloud/axiom";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "./Providers.vibe";
export type VirtualFieldProps = Axiom.CreateVirtualFieldRequest;
export type VirtualField = Resource<"Axiom.VirtualField", VirtualFieldProps, Axiom.CreateVirtualFieldResponse, never, Providers>;
/**
 * An Axiom virtual field — a saved APL expression that appears as a derived
 * column on a dataset at query time. Use these to standardise common
 * computations (status classes, latency buckets, parsed JSON paths) so
 * dashboards and monitors don't have to redefine them.
 *
 * Bound to a single `dataset`; changing the dataset triggers a replacement.
 * @see https://axiom.co/docs/query-data/virtual-fields
 *
 * ### Creating a Virtual Field
 * **Example:** HTTP status class (e.g. 200 → "2xx")
 * ```typescript
 * yield* Axiom.VirtualField("status-class", {
 *   dataset: "my-app-traces",
 *   name: "status_class",
 *   description: "HTTP response class bucket",
 *   expression: 'strcat(tostring(toint(status / 100)), "xx")',
 *   type: "string",
 * });
 * ```
 *
 * **Example:** Latency bucket in seconds
 * ```typescript
 * yield* Axiom.VirtualField("latency-bucket", {
 *   dataset: "my-app-traces",
 *   name: "latency_bucket_s",
 *   expression: "bin(duration_ms / 1000.0, 0.5)",
 *   type: "number",
 *   unit: "s",
 * });
 * ```
 *
 * @resource
 * @product Dataset
 */
export declare const VirtualField: import("alchemy/Resource").ResourceClass<VirtualField>;
export declare const VirtualFieldProvider: () => import("effect/Layer").Layer<Provider.Provider<VirtualField>, never, Axiom.AxiomOpContext>;
