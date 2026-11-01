import type { Input } from "alchemy/Input";
import * as Output from "alchemy/Output";
import * as Effect from "effect/Effect";
/**
 * Lift a script-name input (a literal, an Output.Output, or a Config/Effect-valued
 * name) into an Output so it can feed plan-time derivations.
 *
 * @internal
 */
export declare const asScriptNameOutput: (scriptName: Input<string>) => Output.Output<string>;
/**
 * Derive an account-global Workflow name from a resolved host Worker name and
 * exported class.
 *
 * @internal
 */
export declare const generateWorkflowName: (scriptName: string, className: string) => Effect.Effect<string, never, never>;
/**
 * Derive an account-global Workflow name when the host Worker name may still
 * be an unresolved input.
 *
 * @internal
 */
export declare const makeWorkflowName: (scriptName: Input<string>, className: string) => Output.Output<string>;
