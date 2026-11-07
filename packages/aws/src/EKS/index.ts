export * from "./AccessEntry.vibe";
export * from "./Addon.ts";
export * from "./Cluster.ts";
export * from "./KubernetesAdapter.ts";
export * from "./DescribeAccessEntry.vibe";
export * from "./DescribeAccessEntryHttp.vibe";
export * from "./DescribeAddon.vibe";
export * from "./DescribeAddonHttp.vibe";
export * from "./DescribeAddonConfiguration.vibe";
export * from "./DescribeAddonConfigurationHttp.vibe";
export * from "./DescribeAddonVersions.vibe";
export * from "./DescribeAddonVersionsHttp.vibe";
export * from "./DescribeCapability.vibe";
export * from "./DescribeCapabilityHttp.vibe";
export * from "./DescribeCluster.vibe";
export * from "./DescribeClusterHttp.vibe";
export * from "./DescribeClusterVersions.vibe";
export * from "./DescribeClusterVersionsHttp.vibe";
export * from "./DescribeFargateProfile.vibe";
export * from "./DescribeFargateProfileHttp.vibe";
export * from "./DescribeIdentityProviderConfig.vibe";
export * from "./DescribeIdentityProviderConfigHttp.vibe";
export * from "./DescribeInsight.vibe";
export * from "./DescribeInsightHttp.vibe";
export * from "./DescribeInsightsRefresh.vibe";
export * from "./DescribeInsightsRefreshHttp.vibe";
export * from "./DescribeNodegroup.vibe";
export * from "./DescribeNodegroupHttp.vibe";
export * from "./DescribePodIdentityAssociation.vibe";
export * from "./DescribePodIdentityAssociationHttp.vibe";
export * from "./DescribeUpdate.vibe";
export * from "./DescribeUpdateHttp.vibe";
export * from "./FargateProfile.ts";
export * from "./ListAccessEntries.vibe";
export * from "./ListAccessEntriesHttp.vibe";
export * from "./ListAccessPolicies.vibe";
export * from "./ListAccessPoliciesHttp.vibe";
export * from "./ListAddons.vibe";
export * from "./ListAddonsHttp.vibe";
export * from "./ListAssociatedAccessPolicies.vibe";
export * from "./ListAssociatedAccessPoliciesHttp.vibe";
export * from "./ListCapabilities.vibe";
export * from "./ListCapabilitiesHttp.vibe";
export * from "./ListClusters.vibe";
export * from "./ListClustersHttp.vibe";
export * from "./ListFargateProfiles.vibe";
export * from "./ListFargateProfilesHttp.vibe";
export * from "./ListIdentityProviderConfigs.vibe";
export * from "./ListIdentityProviderConfigsHttp.vibe";
export * from "./ListInsights.vibe";
export * from "./ListInsightsHttp.vibe";
export * from "./ListNodegroups.vibe";
export * from "./ListNodegroupsHttp.vibe";
export * from "./ListPodIdentityAssociations.vibe";
export * from "./ListPodIdentityAssociationsHttp.vibe";
export * from "./ListUpdates.vibe";
export * from "./ListUpdatesHttp.vibe";
export * from "./Nodegroup.ts";
export * from "./PodIdentityAssociation.vibe";
export * from "./StartInsightsRefresh.vibe";
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
