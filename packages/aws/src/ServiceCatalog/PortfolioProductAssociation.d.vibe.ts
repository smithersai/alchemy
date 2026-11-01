import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
export interface PortfolioProductAssociationProps {
    /**
     * ID of the portfolio the product is added to. Changing it replaces the
     * association.
     */
    portfolioId: string;
    /**
     * ID of the product to add to the portfolio. Changing it replaces the
     * association.
     */
    productId: string;
}
export interface PortfolioProductAssociation extends Resource<"AWS.ServiceCatalog.PortfolioProductAssociation", PortfolioProductAssociationProps, {
    /** ID of the portfolio. */
    portfolioId: string;
    /** ID of the associated product. */
    productId: string;
}, never, Providers> {
}
/**
 * Associates a Service Catalog product with a portfolio, making the product
 * launchable by the portfolio's principals.
 *
 * ### Associating a Product
 * **Example:** Add a product to a portfolio
 * ```typescript
 * import * as ServiceCatalog from "@alchemy.run/aws/ServiceCatalog";
 *
 * yield* ServiceCatalog.PortfolioProductAssociation("ToolsVpc", {
 *   portfolioId: portfolio.portfolioId,
 *   productId: product.productId,
 * });
 * ```
 *
 * @resource
 */
export declare const PortfolioProductAssociation: import("alchemy").ResourceClass<PortfolioProductAssociation>;
export declare const PortfolioProductAssociationProvider: () => import("effect/Layer").Layer<Provider.Provider<PortfolioProductAssociation>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
