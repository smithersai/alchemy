import * as Layer from "effect/Layer";
import { GenerateWallet } from "./GenerateWallet.js";
/**
 * HTTP implementation of {@link GenerateWallet}.
 *
 * @layer
 * @provides GCP.OracleDatabase.GenerateWallet
 */
export declare const GenerateWalletHttp: Layer.Layer<GenerateWallet, never, never>;
