import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
export interface LabelProps {
    /**
     * Name of the label. If omitted, a unique lowercase name is generated from
     * the app, stage, and logical ID. Changing the name replaces the label.
     */
    name?: string;
    /**
     * Human-readable description. This is an in-place update.
     */
    description?: string;
    /**
     * User-defined tags for the label.
     */
    tags?: Record<string, string>;
}
export interface Label extends Resource<"AWS.FraudDetector.Label", LabelProps, {
    /** The name of the label. */
    name: string;
    /** The ARN of the label. */
    arn: string;
}, never, Providers> {
}
/**
 * An Amazon Fraud Detector label — a classification (e.g. `fraud`, `legit`)
 * used to tag stored events for supervised model training. Event types
 * reference labels; they are cheap metadata objects.
 *
 * ### Creating a Label
 * **Example:** Fraud and Legit Labels
 * ```typescript
 * const fraud = yield* FraudDetector.Label("fraud", {
 *   description: "confirmed fraudulent event",
 * });
 * const legit = yield* FraudDetector.Label("legit", {});
 * ```
 *
 * @resource
 */
export declare const Label: import("alchemy").ResourceClass<Label>;
export declare const LabelProvider: () => import("effect/Layer").Layer<Provider.Provider<Label>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
