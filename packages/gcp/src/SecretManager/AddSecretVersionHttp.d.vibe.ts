import * as Layer from "effect/Layer";
import { AddSecretVersion } from "./AddSecretVersion.vibe";
/**
 * HTTP implementation of {@link AddSecretVersion}.
 *
 * @layer
 * @provides GCP.SecretManager.AddSecretVersion
 */
export declare const AddSecretVersionHttp: Layer.Layer<AddSecretVersion, never, never>;
