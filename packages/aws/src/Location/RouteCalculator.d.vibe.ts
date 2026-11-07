import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const RouteCalculatorUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "RouteCalculatorUnexpectedResponse";
} & Readonly<A>;
export declare class RouteCalculatorUnexpectedResponse extends RouteCalculatorUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface RouteCalculatorProps {
    /**
     * Name of the route calculator. Immutable — changing it replaces the
     * calculator.
     * @default ${app}-${stage}-${id}
     */
    calculatorName?: string;
    /**
     * Data provider for routing. Immutable — changing it replaces the
     * calculator. One of `Esri`, `Grab`, or `Here`.
     */
    dataSource: string;
    /**
     * Optional description of the route calculator resource.
     */
    description?: string;
    /**
     * Tags to associate with the route calculator.
     */
    tags?: Record<string, string>;
}
export interface RouteCalculator extends Resource<"AWS.Location.RouteCalculator", RouteCalculatorProps, {
    /** Physical name of the route calculator. */
    calculatorName: string;
    /** ARN of the route calculator. */
    calculatorArn: string;
    /** Data provider backing the calculator. */
    dataSource: string;
    /** Description of the route calculator. */
    description: string | undefined;
    /** Tags currently associated with the calculator. */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An Amazon Location Service route calculator. A route calculator computes
 * routes and route matrices against a chosen data provider. The data source
 * is immutable; the description can be updated in place.
 *
 * ### Creating Route Calculators
 * **Example:** Basic Route Calculator
 * ```typescript
 * import * as Location from "@alchemy.run/aws/Location";
 *
 * const calculator = yield* Location.RouteCalculator("Routes", {
 *   dataSource: "Esri",
 * });
 * ```
 *
 * @resource
 */
export declare const RouteCalculator: import("alchemy").ResourceClass<RouteCalculator>;
export declare const RouteCalculatorProvider: () => import("effect/Layer").Layer<Provider.Provider<RouteCalculator>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
