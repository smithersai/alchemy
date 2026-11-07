import * as Layer from "effect/Layer";
import { RetrieveCustomerTaxId } from "./RetrieveCustomerTaxId.vibe";
/**
 * HTTP implementation of {@link RetrieveCustomerTaxId}. The nested
 * retrieve takes both `customer` and `id`.
 *
 * @layer
 * @product Customer
 * @provides Stripe.RetrieveCustomerTaxId
 */
export declare const RetrieveCustomerTaxIdHttp: Layer.Layer<RetrieveCustomerTaxId, never, never>;
