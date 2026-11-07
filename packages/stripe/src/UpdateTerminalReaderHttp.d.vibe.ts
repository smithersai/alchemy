import * as Layer from "effect/Layer";
import { UpdateTerminalReader } from "./UpdateTerminalReader.vibe";
/**
 * HTTP implementation of {@link UpdateTerminalReader}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Terminal
 * @provides Stripe.UpdateTerminalReader
 */
export declare const UpdateTerminalReaderHttp: Layer.Layer<UpdateTerminalReader, never, never>;
