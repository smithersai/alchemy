import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
export interface VirtualClusterContainerProvider {
    /**
     * The name of the underlying EKS cluster. Changing it replaces the virtual
     * cluster.
     */
    id: string;
    /**
     * The container provider type.
     * @default "EKS"
     */
    type?: "EKS";
    /**
     * The namespace registration for the underlying EKS cluster.
     */
    info?: {
        eksInfo: {
            /**
             * The Kubernetes namespace the virtual cluster maps to. Changing it
             * replaces the virtual cluster.
             */
            namespace?: string;
            /**
             * A node label selector restricting which nodes run the jobs.
             */
            nodeLabel?: string;
        };
    };
}
export interface VirtualClusterProps {
    /**
     * Name of the virtual cluster (1-64 characters: letters, digits, `.` `_`
     * `/` `#` `-`). Changing the name replaces the virtual cluster.
     * @default a generated physical name
     */
    virtualClusterName?: string;
    /**
     * The EKS cluster and namespace this virtual cluster maps to. Virtual
     * clusters are immutable — any change replaces the virtual cluster.
     */
    containerProvider: VirtualClusterContainerProvider;
    /**
     * The ID of an EMR containers security configuration to attach. Changing
     * it replaces the virtual cluster.
     */
    securityConfigurationId?: string;
    /**
     * Tags to apply to the virtual cluster. Merged with the internal Alchemy
     * tags.
     */
    tags?: Record<string, string>;
}
export interface VirtualCluster extends Resource<"AWS.EMRContainers.VirtualCluster", VirtualClusterProps, {
    /** The ID of the virtual cluster. */
    virtualClusterId: string;
    /** The name of the virtual cluster. */
    virtualClusterName: string;
    /** The ARN of the virtual cluster. */
    virtualClusterArn: string;
    /** The name of the EKS cluster backing the virtual cluster. */
    eksClusterName: string;
    /** The virtual cluster state (e.g. `RUNNING`, `TERMINATING`). */
    state?: string;
}, {}, Providers> {
}
/**
 * An Amazon EMR on EKS virtual cluster — a registration of a Kubernetes
 * namespace on an EKS cluster as an EMR job-submission target. Virtual
 * clusters consume no resources themselves (no cost while idle); jobs
 * submitted to the virtual cluster run as pods in the mapped namespace.
 *
 * The underlying EKS cluster must grant Amazon EMR on EKS access to the
 * namespace (via EKS access entries when the cluster's authentication mode
 * includes `API`, or the legacy `aws-auth` ConfigMap). Everything except tags
 * is immutable — changes replace the virtual cluster.
 *
 * ### Creating Virtual Clusters
 * **Example:** Register an EKS Namespace with EMR
 * ```typescript
 * import * as AWS from "@alchemy.run/aws";
 *
 * const cluster = yield* AWS.EKS.Cluster("Cluster", {
 *   roleArn: clusterRole.roleArn,
 *   resourcesVpcConfig: { subnetIds },
 *   accessConfig: { authenticationMode: "API_AND_CONFIG_MAP" },
 * });
 *
 * const virtualCluster = yield* AWS.EMRContainers.VirtualCluster("Spark", {
 *   containerProvider: {
 *     id: cluster.clusterName,
 *     info: { eksInfo: { namespace: "emr" } },
 *   },
 * });
 * // virtualCluster.virtualClusterId is passed to StartJobRun
 * ```
 *
 * @resource
 */
export declare const VirtualCluster: import("alchemy").ResourceClass<VirtualCluster>;
export declare const VirtualClusterProvider: () => import("effect/Layer").Layer<Provider.Provider<VirtualCluster>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
