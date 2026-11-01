import type * as Prompt from "effect/cli/Prompt";
import * as Layer from "effect/Layer";
import { Interaction } from "../Interaction.js";
import type { Cli } from "../Report.js";
/** Select the interactive or append-only root renderer. */
export declare const selectCliServices: () => Layer.Layer<Cli, never, Interaction | Prompt.Environment>;
