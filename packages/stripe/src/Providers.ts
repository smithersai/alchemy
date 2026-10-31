import { CredentialsStoreLive } from "alchemy/Auth/Credentials";
import { ProfileStoreLive } from "alchemy/Auth/Profile";
import * as Provider from "alchemy/Provider";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Layer from "effect/Layer";
import { Account, AccountProvider } from "./Account.ts";
import {
  AccountExternalAccount,
  AccountExternalAccountProvider,
} from "./AccountExternalAccount.ts";
import { AccountPerson, AccountPersonProvider } from "./AccountPerson.ts";
import { Alert, AlertProvider } from "./Alert.ts";
import { ApplePayDomain, ApplePayDomainProvider } from "./ApplePayDomain.vibe";
import { AppsSecret, AppsSecretProvider } from "./AppsSecret.ts";
import { StripeAuth } from "./AuthProvider.vibe";
import { BillingMeter, BillingMeterProvider } from "./BillingMeter.ts";
import {
  BillingPortalConfiguration,
  BillingPortalConfigurationProvider,
} from "./BillingPortalConfiguration.ts";
import { Coupon, CouponProvider } from "./Coupon.ts";
import { CreateAccountHttp } from "./CreateAccountHttp.vibe";
import { CreateAccountLinkHttp } from "./CreateAccountLinkHttp.vibe";
import { CreateAppsSecretHttp } from "./CreateAppsSecretHttp.vibe";
import { CreateCreditGrantHttp } from "./CreateCreditGrantHttp.vibe";
import { CreateCustomerHttp } from "./CreateCustomerHttp.vibe";
import { CreateFileLinkHttp } from "./CreateFileLinkHttp.vibe";
import { CreateIssuingCardholderHttp } from "./CreateIssuingCardholderHttp.vibe";
import { CreateIssuingCardHttp } from "./CreateIssuingCardHttp.vibe";
import { CreateTerminalReaderHttp } from "./CreateTerminalReaderHttp.vibe";
import * as Credentials from "./Credentials.vibe";
import { CreditGrant, CreditGrantProvider } from "./CreditGrant.ts";
import { Customer, CustomerProvider } from "./Customer.ts";
import { CustomerTaxId, CustomerTaxIdProvider } from "./CustomerTaxId.vibe";
import { EntitlementsFeature, EntitlementsFeatureProvider } from "./EntitlementsFeature.ts";
import { FileLink, FileLinkProvider } from "./FileLink.ts";
import { IssuingCard, IssuingCardProvider } from "./IssuingCard.ts";
import { IssuingCardholder, IssuingCardholderProvider } from "./IssuingCardholder.ts";
import {
  IssuingPersonalizationDesign,
  IssuingPersonalizationDesignProvider,
} from "./IssuingPersonalizationDesign.ts";
import { PaymentLink, PaymentLinkProvider } from "./PaymentLink.ts";
import {
  PaymentMethodConfiguration,
  PaymentMethodConfigurationProvider,
} from "./PaymentMethodConfiguration.ts";
import { PaymentMethodDomain, PaymentMethodDomainProvider } from "./PaymentMethodDomain.ts";
import { Plan, PlanProvider } from "./Plan.ts";
import { Price, PriceProvider } from "./Price.ts";
import { Product, ProductProvider } from "./Product.ts";
import { ProductFeature, ProductFeatureProvider } from "./ProductFeature.vibe";
import { PromotionCode, PromotionCodeProvider } from "./PromotionCode.ts";
import { RadarValueList, RadarValueListProvider } from "./RadarValueList.ts";
import { RadarValueListItem, RadarValueListItemProvider } from "./RadarValueListItem.vibe";
import { RestrictedApiKey, RestrictedApiKeyProvider } from "./RestrictedApiKey.vibe";
import { RetrieveAccountExternalAccountHttp } from "./RetrieveAccountExternalAccountHttp.vibe";
import { RetrieveAccountHttp } from "./RetrieveAccountHttp.vibe";
import { RetrieveAccountPersonHttp } from "./RetrieveAccountPersonHttp.vibe";
import { RetrieveAlertHttp } from "./RetrieveAlertHttp.vibe";
import { RetrieveApplePayDomainHttp } from "./RetrieveApplePayDomainHttp.vibe";
import { RetrieveAppsSecretHttp } from "./RetrieveAppsSecretHttp.vibe";
import { RetrieveBillingMeterHttp } from "./RetrieveBillingMeterHttp.vibe";
import { RetrieveBillingPortalConfigurationHttp } from "./RetrieveBillingPortalConfigurationHttp.vibe";
import { RetrieveCouponHttp } from "./RetrieveCouponHttp.vibe";
import { RetrieveCreditGrantHttp } from "./RetrieveCreditGrantHttp.vibe";
import { RetrieveCustomerHttp } from "./RetrieveCustomerHttp.vibe";
import { RetrieveCustomerTaxIdHttp } from "./RetrieveCustomerTaxIdHttp.vibe";
import { RetrieveEntitlementsFeatureHttp } from "./RetrieveEntitlementsFeatureHttp.vibe";
import { RetrieveFileLinkHttp } from "./RetrieveFileLinkHttp.vibe";
import { RetrieveIssuingCardholderHttp } from "./RetrieveIssuingCardholderHttp.vibe";
import { RetrieveIssuingCardHttp } from "./RetrieveIssuingCardHttp.vibe";
import { RetrieveIssuingPersonalizationDesignHttp } from "./RetrieveIssuingPersonalizationDesignHttp.vibe";
import { RetrievePaymentLinkHttp } from "./RetrievePaymentLinkHttp.vibe";
import { RetrievePaymentMethodConfigurationHttp } from "./RetrievePaymentMethodConfigurationHttp.vibe";
import { RetrievePaymentMethodDomainHttp } from "./RetrievePaymentMethodDomainHttp.vibe";
import { RetrievePlanHttp } from "./RetrievePlanHttp.vibe";
import { RetrievePriceHttp } from "./RetrievePriceHttp.vibe";
import { RetrieveProductFeatureHttp } from "./RetrieveProductFeatureHttp.vibe";
import { RetrieveProductHttp } from "./RetrieveProductHttp.vibe";
import { RetrievePromotionCodeHttp } from "./RetrievePromotionCodeHttp.vibe";
import { RetrieveRadarValueListHttp } from "./RetrieveRadarValueListHttp.vibe";
import { RetrieveRadarValueListItemHttp } from "./RetrieveRadarValueListItemHttp.vibe";
import { RetrieveShippingRateHttp } from "./RetrieveShippingRateHttp.vibe";
import { RetrieveTaxRateHttp } from "./RetrieveTaxRateHttp.vibe";
import { RetrieveTaxRegistrationHttp } from "./RetrieveTaxRegistrationHttp.vibe";
import { RetrieveTaxSettingsHttp } from "./RetrieveTaxSettingsHttp.vibe";
import { RetrieveTerminalConfigurationHttp } from "./RetrieveTerminalConfigurationHttp.vibe";
import { RetrieveTerminalLocationHttp } from "./RetrieveTerminalLocationHttp.vibe";
import { RetrieveTerminalReaderHttp } from "./RetrieveTerminalReaderHttp.vibe";
import { RetrieveWebhookEndpointHttp } from "./RetrieveWebhookEndpointHttp.vibe";
import { ShippingRate, ShippingRateProvider } from "./ShippingRate.ts";
import { TaxRate, TaxRateProvider } from "./TaxRate.ts";
import { TaxRegistration, TaxRegistrationProvider } from "./TaxRegistration.ts";
import { TaxSettings, TaxSettingsProvider } from "./TaxSettings.ts";
import { TerminalConfiguration, TerminalConfigurationProvider } from "./TerminalConfiguration.ts";
import { TerminalLocation, TerminalLocationProvider } from "./TerminalLocation.ts";
import { TerminalReader, TerminalReaderProvider } from "./TerminalReader.ts";
import { UpdateAccountHttp } from "./UpdateAccountHttp.vibe";
import { UpdateCreditGrantHttp } from "./UpdateCreditGrantHttp.vibe";
import { UpdateCustomerHttp } from "./UpdateCustomerHttp.vibe";
import { UpdateFileLinkHttp } from "./UpdateFileLinkHttp.vibe";
import { UpdateIssuingCardholderHttp } from "./UpdateIssuingCardholderHttp.vibe";
import { UpdateIssuingCardHttp } from "./UpdateIssuingCardHttp.vibe";
import { UpdateTaxSettingsHttp } from "./UpdateTaxSettingsHttp.vibe";
import { UpdateTerminalReaderHttp } from "./UpdateTerminalReaderHttp.vibe";
import { WebhookEndpoint, WebhookEndpointProvider } from "./WebhookEndpoint.ts";

export class Providers extends Provider.ProviderCollection<Providers>()("Stripe") {}

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
export const providers = () =>
  Layer.effect(
    Providers,
    Provider.collection([
      Account,
      AccountExternalAccount,
      AccountPerson,
      Alert,
      ApplePayDomain,
      AppsSecret,
      BillingMeter,
      BillingPortalConfiguration,
      Coupon,
      CreditGrant,
      Customer,
      CustomerTaxId,
      EntitlementsFeature,
      FileLink,
      IssuingCard,
      IssuingCardholder,
      IssuingPersonalizationDesign,
      PaymentLink,
      PaymentMethodConfiguration,
      PaymentMethodDomain,
      Plan,
      Price,
      Product,
      ProductFeature,
      PromotionCode,
      RadarValueList,
      RadarValueListItem,
      RestrictedApiKey,
      ShippingRate,
      TaxRate,
      TaxRegistration,
      TaxSettings,
      TerminalConfiguration,
      TerminalLocation,
      TerminalReader,
      WebhookEndpoint,
    ]),
  ).pipe(
    Layer.provide(
      Layer.mergeAll(
        AccountProvider(),
        AccountExternalAccountProvider(),
        AccountPersonProvider(),
        AlertProvider(),
        ApplePayDomainProvider(),
        AppsSecretProvider(),
        BillingMeterProvider(),
        BillingPortalConfigurationProvider(),
        CouponProvider(),
        CreditGrantProvider(),
        CustomerProvider(),
        CustomerTaxIdProvider(),
        EntitlementsFeatureProvider(),
        FileLinkProvider(),
        IssuingCardProvider(),
        IssuingCardholderProvider(),
        IssuingPersonalizationDesignProvider(),
        PaymentLinkProvider(),
        PaymentMethodConfigurationProvider(),
        PaymentMethodDomainProvider(),
        PlanProvider(),
        PriceProvider(),
        ProductProvider(),
        ProductFeatureProvider(),
        PromotionCodeProvider(),
        RadarValueListProvider(),
        RadarValueListItemProvider(),
        RestrictedApiKeyProvider(),
        ShippingRateProvider(),
        TaxRateProvider(),
        TaxRegistrationProvider(),
        TaxSettingsProvider(),
        TerminalConfigurationProvider(),
        TerminalLocationProvider(),
        TerminalReaderProvider(),
        WebhookEndpointProvider(),
      ),
    ),
    Layer.provideMerge(
      Layer.mergeAll(
        CreateAccountHttp,
        CreateAccountLinkHttp,
        CreateAppsSecretHttp,
        CreateCreditGrantHttp,
        CreateCustomerHttp,
        CreateFileLinkHttp,
        CreateIssuingCardHttp,
        CreateIssuingCardholderHttp,
        CreateTerminalReaderHttp,
        RetrieveAccountExternalAccountHttp,
        RetrieveAccountHttp,
        RetrieveAccountPersonHttp,
        RetrieveAlertHttp,
        RetrieveApplePayDomainHttp,
        RetrieveAppsSecretHttp,
        RetrieveBillingMeterHttp,
        RetrieveBillingPortalConfigurationHttp,
        RetrieveCouponHttp,
        RetrieveCreditGrantHttp,
        RetrieveCustomerHttp,
        RetrieveCustomerTaxIdHttp,
        RetrieveEntitlementsFeatureHttp,
        RetrieveFileLinkHttp,
        RetrieveIssuingCardHttp,
        RetrieveIssuingCardholderHttp,
        RetrieveIssuingPersonalizationDesignHttp,
        RetrievePaymentLinkHttp,
        RetrievePaymentMethodConfigurationHttp,
        RetrievePaymentMethodDomainHttp,
        RetrievePlanHttp,
        RetrievePriceHttp,
        RetrieveProductFeatureHttp,
        RetrieveProductHttp,
        RetrievePromotionCodeHttp,
        RetrieveRadarValueListHttp,
        RetrieveRadarValueListItemHttp,
        RetrieveShippingRateHttp,
        RetrieveTaxRateHttp,
        RetrieveTaxRegistrationHttp,
        RetrieveTaxSettingsHttp,
        RetrieveTerminalConfigurationHttp,
        RetrieveTerminalLocationHttp,
        RetrieveTerminalReaderHttp,
        RetrieveWebhookEndpointHttp,
        UpdateAccountHttp,
        UpdateCreditGrantHttp,
        UpdateCustomerHttp,
        UpdateFileLinkHttp,
        UpdateIssuingCardHttp,
        UpdateIssuingCardholderHttp,
        UpdateTaxSettingsHttp,
        UpdateTerminalReaderHttp,
      ),
    ),
    Layer.provideMerge(Credentials.fromAuthProvider()),
    Layer.provideMerge(StripeAuth),
    Layer.provideMerge(ProfileStoreLive),
    Layer.provideMerge(CredentialsStoreLive),
    Layer.provideMerge(FetchHttpClient.layer),
    Layer.orDie,
  );
