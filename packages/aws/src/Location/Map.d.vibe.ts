import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
declare const MapUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "MapUnexpectedResponse";
} & Readonly<A>;
export declare class MapUnexpectedResponse extends MapUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
/**
 * Rendering configuration for a map. `style` selects the base map style and is
 * immutable — changing it replaces the map.
 */
export interface MapConfiguration {
    /**
     * The map style. Selecting a style determines the map's data provider
     * (Esri, HERE, or Grab). Immutable — changing the style replaces the map.
     *
     * Common values: `VectorEsriNavigation`, `VectorEsriStreets`,
     * `VectorHereExplore`, `RasterHereExploreSatellite`,
     * `VectorGrabStandardLight`.
     */
    style: string;
    /**
     * Political view (an ISO 3166-1 alpha-3 country code) applied to the map's
     * disputed borders and labels.
     */
    politicalView?: string;
}
export interface MapProps {
    /**
     * Name of the map resource. Immutable — changing it replaces the map.
     * @default ${app}-${stage}-${id}
     */
    mapName?: string;
    /**
     * Rendering configuration for the map (base style + political view).
     */
    configuration: MapConfiguration;
    /**
     * Optional description of the map resource.
     */
    description?: string;
    /**
     * Tags to associate with the map.
     */
    tags?: Record<string, string>;
}
export interface Map extends Resource<"AWS.Location.Map", MapProps, {
    /** Physical name of the map resource. */
    mapName: string;
    /** ARN of the map resource. */
    mapArn: string;
    /** The map style selected at creation. */
    style: string;
    /** Political view currently applied to the map, if any. */
    politicalView: string | undefined;
    /** Data provider backing the map, derived from the style. */
    dataSource: string;
    /** Description of the map resource. */
    description: string | undefined;
    /** Tags currently associated with the map. */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An Amazon Location Service map resource. A map exposes vector/raster tiles,
 * glyphs, and sprites for a chosen base style. The map style is immutable;
 * the political view and description can be updated in place.
 *
 * ### Creating Maps
 * **Example:** Basic Map
 * ```typescript
 * import * as Location from "@alchemy.run/aws/Location";
 *
 * const map = yield* Location.Map("AppMap", {
 *   configuration: { style: "VectorEsriNavigation" },
 * });
 * ```
 *
 * **Example:** Map with Political View
 * ```typescript
 * const map = yield* Location.Map("RegionMap", {
 *   configuration: { style: "VectorHereExplore", politicalView: "IND" },
 *   description: "Map with India political view",
 * });
 * ```
 *
 * @resource
 */
export declare const Map: import("alchemy").ResourceClass<Map>;
export declare const MapProvider: () => import("effect/Layer").Layer<Provider.Provider<Map>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
