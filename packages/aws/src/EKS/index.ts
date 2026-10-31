export * from "./AccessEntry.ts";
export * from "./Addon.ts";
export * from "./Cluster.ts";
export * from "./KubernetesAdapter.ts";
export * from "./DescribeAccessEntry.ts";
export * from "./DescribeAccessEntryHttp.vibe";
export * from "./DescribeAddon.ts";
export * from "./DescribeAddonHttp.vibe";
export * from "./DescribeAddonConfiguration.ts";
export * from "./DescribeAddonConfigurationHttp.vibe";
export * from "./DescribeAddonVersions.ts";
export * from "./DescribeAddonVersionsHttp.vibe";
export * from "./DescribeCapability.ts";
export * from "./DescribeCapabilityHttp.vibe";
export * from "./DescribeCluster.ts";
export * from "./DescribeClusterHttp.vibe";
export * from "./DescribeClusterVersions.ts";
export * from "./DescribeClusterVersionsHttp.vibe";
export * from "./DescribeFargateProfile.ts";
export * from "./DescribeFargateProfileHttp.vibe";
export * from "./DescribeIdentityProviderConfig.ts";
export * from "./DescribeIdentityProviderConfigHttp.vibe";
export * from "./DescribeInsight.ts";
export * from "./DescribeInsightHttp.vibe";
export * from "./DescribeInsightsRefresh.ts";
export * from "./DescribeInsightsRefreshHttp.vibe";
export * from "./DescribeNodegroup.ts";
export * from "./DescribeNodegroupHttp.vibe";
export * from "./DescribePodIdentityAssociation.ts";
export * from "./DescribePodIdentityAssociationHttp.vibe";
export * from "./DescribeUpdate.ts";
export * from "./DescribeUpdateHttp.vibe";
export * from "./FargateProfile.ts";
export * from "./ListAccessEntries.ts";
export * from "./ListAccessEntriesHttp.vibe";
export * from "./ListAccessPolicies.ts";
export * from "./ListAccessPoliciesHttp.vibe";
export * from "./ListAddons.ts";
export * from "./ListAddonsHttp.vibe";
export * from "./ListAssociatedAccessPolicies.ts";
export * from "./ListAssociatedAccessPoliciesHttp.vibe";
export * from "./ListCapabilities.ts";
export * from "./ListCapabilitiesHttp.vibe";
export * from "./ListClusters.ts";
export * from "./ListClustersHttp.vibe";
export * from "./ListFargateProfiles.ts";
export * from "./ListFargateProfilesHttp.vibe";
export * from "./ListIdentityProviderConfigs.ts";
export * from "./ListIdentityProviderConfigsHttp.vibe";
export * from "./ListInsights.ts";
export * from "./ListInsightsHttp.vibe";
export * from "./ListNodegroups.ts";
export * from "./ListNodegroupsHttp.vibe";
export * from "./ListPodIdentityAssociations.ts";
export * from "./ListPodIdentityAssociationsHttp.vibe";
export * from "./ListUpdates.ts";
export * from "./ListUpdatesHttp.vibe";
export * from "./Nodegroup.ts";
export * from "./PodIdentityAssociation.ts";
export * from "./StartInsightsRefresh.ts";
export * from "./StartInsightsRefreshHttp.vibe";

/**
 * @deprecated The Kubernetes workloads moved to the cluster-agnostic
 * `@alchemy.run/kubernetes` namespace (`Kubernetes.Deployment`,
 * `Kubernetes.Job`, `Kubernetes.Manifest`, `Kubernetes.HelmChart`) — they
 * take an `AWS.EKS.Cluster` (or any cluster) as their `cluster` prop and
 * are registered by `Kubernetes.providers()`. These re-exports keep old
 * imports compiling for one release; existing state migrates in place via
 * type aliases.
 */
export { Deployment, HelmChart, Job, Manifest } from "@alchemy.run/kubernetes";
