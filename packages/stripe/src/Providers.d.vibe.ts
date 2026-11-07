import * as Provider from "alchemy/Provider";
import * as Layer from "effect/Layer";
import * as Credentials from "./Credentials.vibe";
declare const Providers_base: Provider.ProviderCollection<Providers, "Stripe">;
export declare class Providers extends Providers_base {
}
export type ProviderRequirements = Layer.Services<ReturnType<typeof providers>>;
/**
 * Build a layer that registers all Stripe resource providers, the Stripe
 * `AuthProvider`, the resolved `Credentials`, and an `HttpClient`. Include
 * this from your stack alongside other cloud `providers()` layers.
 *
 * Resource providers are inserted into {@link Provider.collection} as they
 * land.
 *
 * @example
 * ```typescript
 * import * as Alchemy from "alchemy";
 * import * as Stripe from "@alchemy.run/stripe";
 * import * as Effect from "effect/Effect";
 *
 * export default Alchemy.Stack(
 *   "MyStack",
 *   {
 *     providers: Stripe.providers(),
 *     state: Alchemy.localState(),
 *   },
 *   Effect.gen(function* () {
 *     return {};
 *   }),
 * );
 * ```
 */
export declare const providers: () => Layer.Layer<import("./CreateAccount.vibe").CreateAccount | import("./CreateAccountLink.vibe").CreateAccountLink | import("./CreateAppsSecret.vibe").CreateAppsSecret | import("./CreateCreditGrant.vibe").CreateCreditGrant | import("./CreateCustomer.vibe").CreateCustomer | import("./CreateFileLink.vibe").CreateFileLink | import("./CreateIssuingCard.vibe").CreateIssuingCard | import("./CreateIssuingCardholder.vibe").CreateIssuingCardholder | import("./CreateTerminalReader.vibe").CreateTerminalReader | Credentials.Credentials | import("alchemy/Auth/Credentials").CredentialsStore | import("effect/http/HttpClient").HttpClient | import("alchemy/Auth/Profile").ProfileStore | Providers | import("./RetrieveAccount.vibe").RetrieveAccount | import("./RetrieveAccountExternalAccount.vibe").RetrieveAccountExternalAccount | import("./RetrieveAccountPerson.vibe").RetrieveAccountPerson | import("./RetrieveAlert.vibe").RetrieveAlert | import("./RetrieveApplePayDomain.vibe").RetrieveApplePayDomain | import("./RetrieveAppsSecret.vibe").RetrieveAppsSecret | import("./RetrieveBillingMeter.vibe").RetrieveBillingMeter | import("./RetrieveBillingPortalConfiguration.vibe").RetrieveBillingPortalConfiguration | import("./RetrieveCoupon.vibe").RetrieveCoupon | import("./RetrieveCreditGrant.vibe").RetrieveCreditGrant | import("./RetrieveCustomer.vibe").RetrieveCustomer | import("./RetrieveCustomerTaxId.vibe").RetrieveCustomerTaxId | import("./RetrieveEntitlementsFeature.vibe").RetrieveEntitlementsFeature | import("./RetrieveFileLink.vibe").RetrieveFileLink | import("./RetrieveIssuingCard.vibe").RetrieveIssuingCard | import("./RetrieveIssuingCardholder.vibe").RetrieveIssuingCardholder | import("./RetrieveIssuingPersonalizationDesign.vibe").RetrieveIssuingPersonalizationDesign | import("./RetrievePaymentLink.vibe").RetrievePaymentLink | import("./RetrievePaymentMethodConfiguration.vibe").RetrievePaymentMethodConfiguration | import("./RetrievePaymentMethodDomain.vibe").RetrievePaymentMethodDomain | import("./RetrievePlan.vibe").RetrievePlan | import("./RetrievePrice.vibe").RetrievePrice | import("./RetrieveProduct.vibe").RetrieveProduct | import("./RetrieveProductFeature.vibe").RetrieveProductFeature | import("./RetrievePromotionCode.vibe").RetrievePromotionCode | import("./RetrieveRadarValueList.vibe").RetrieveRadarValueList | import("./RetrieveRadarValueListItem.vibe").RetrieveRadarValueListItem | import("./RetrieveShippingRate.vibe").RetrieveShippingRate | import("./RetrieveTaxRate.vibe").RetrieveTaxRate | import("./RetrieveTaxRegistration.vibe").RetrieveTaxRegistration | import("./RetrieveTaxSettings.vibe").RetrieveTaxSettings | import("./RetrieveTerminalConfiguration.vibe").RetrieveTerminalConfiguration | import("./RetrieveTerminalLocation.vibe").RetrieveTerminalLocation | import("./RetrieveTerminalReader.vibe").RetrieveTerminalReader | import("./RetrieveWebhookEndpoint.vibe").RetrieveWebhookEndpoint | import("./UpdateAccount.vibe").UpdateAccount | import("./UpdateCreditGrant.vibe").UpdateCreditGrant | import("./UpdateCustomer.vibe").UpdateCustomer | import("./UpdateFileLink.vibe").UpdateFileLink | import("./UpdateIssuingCard.vibe").UpdateIssuingCard | import("./UpdateIssuingCardholder.vibe").UpdateIssuingCardholder | import("./UpdateTaxSettings.vibe").UpdateTaxSettings | import("./UpdateTerminalReader.vibe").UpdateTerminalReader, never, import("alchemy/Auth/Registry").AuthProviders | import("effect/FileSystem").FileSystem | import("effect/Path").Path | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export {};
