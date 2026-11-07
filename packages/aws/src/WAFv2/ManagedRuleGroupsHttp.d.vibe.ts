import * as Layer from "effect/Layer";
import { DescribeAllManagedProducts, DescribeManagedProductsByVendor, DescribeManagedRuleGroup, ListAvailableManagedRuleGroups, ListAvailableManagedRuleGroupVersions } from "./ManagedRuleGroups.vibe";
export declare const DescribeManagedRuleGroupHttp: Layer.Layer<DescribeManagedRuleGroup, never, never>;
export declare const ListAvailableManagedRuleGroupsHttp: Layer.Layer<ListAvailableManagedRuleGroups, never, never>;
export declare const ListAvailableManagedRuleGroupVersionsHttp: Layer.Layer<ListAvailableManagedRuleGroupVersions, never, never>;
export declare const DescribeAllManagedProductsHttp: Layer.Layer<DescribeAllManagedProducts, never, never>;
export declare const DescribeManagedProductsByVendorHttp: Layer.Layer<DescribeManagedProductsByVendor, never, never>;
