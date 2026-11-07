import * as Provider from "alchemy/Provider";
import * as Layer from "effect/Layer";
declare const Providers_base: Provider.ProviderCollection<Providers, "ACME">;
export declare class Providers extends Providers_base {
}
export type ProviderRequirements = Layer.Services<ReturnType<typeof providers>>;
/**
 * Registers the ACME resource providers ({@link Account},
 * {@link Certificate}) and the {@link IssueCertificateHttp} binding. DNS-01
 * solvers come from the DNS provider, e.g. `Cloudflare.providers()` registers
 * `Cloudflare.ACME.ZoneSolver`.
 *
 * @example
 * ```typescript
 * export default Alchemy.Stack(
 *   "Certs",
 *   {
 *     providers: Layer.mergeAll(ACME.providers(), Cloudflare.providers()),
 *     state: Alchemy.localState(),
 *   },
 *   Effect.gen(function* () {
 *     const wildcard = yield* Wildcard;
 *     return { notAfter: wildcard.notAfter };
 *   }),
 * );
 * ```
 */
export declare const providers: () => Layer.Layer<import("effect/http/HttpClient").HttpClient | import("./IssueCertificate.vibe").IssueCertificate | Providers, never, never>;
export {};
