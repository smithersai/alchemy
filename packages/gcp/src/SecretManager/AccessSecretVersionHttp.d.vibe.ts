import * as Layer from "effect/Layer";
import { AccessSecretVersion } from "./AccessSecretVersion.js";
/**
 * HTTP implementation of {@link AccessSecretVersion}.
 *
 * @layer
 * @provides GCP.SecretManager.AccessSecretVersion
 */
export declare const AccessSecretVersionHttp: Layer.Layer<AccessSecretVersion, never, never>;
