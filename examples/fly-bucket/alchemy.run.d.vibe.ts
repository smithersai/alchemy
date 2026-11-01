import * as Fly from "@alchemy.run/fly";
/**
 * Fly.io Tigris bucket attached to an HTTP Service.
 *
 * The Service binds Fly.PutObject / Fly.GetObject and talks to Tigris
 * over the S3 API.
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    appName: Alchemy.Output<string, never>;
    bucketName: Alchemy.Output<string, never>;
    addOnId: Alchemy.Output<string, never>;
    apiUrl: Alchemy.Output<string | undefined, never>;
}, NoInfer<Fly.Providers>>;
export default _default;
