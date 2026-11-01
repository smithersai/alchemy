import { DockerLive } from "@alchemy.run/docker/Docker";
import { CredentialsStoreLive } from "alchemy/Auth/Credentials";
import { ProfileStoreLive } from "alchemy/Auth/Profile";
import * as Command from "alchemy/Command";
import * as Provider from "alchemy/Provider";
import {
  Server as WebsiteServer,
  ServerProvider as WebsiteServerProvider,
} from "alchemy/Website/Server";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Layer from "effect/Layer";
import {
  AccessPoliciesAccessLevel,
  AccessPoliciesAccessLevelProvider,
} from "./AccessContextManager/AccessPoliciesAccessLevel.vibe";
import {
  AccessPoliciesAuthorizedOrgsDesc,
  AccessPoliciesAuthorizedOrgsDescProvider,
} from "./AccessContextManager/AccessPoliciesAuthorizedOrgsDesc.vibe";
import {
  AccessPoliciesServicePerimeter,
  AccessPoliciesServicePerimeterProvider,
} from "./AccessContextManager/AccessPoliciesServicePerimeter.vibe";
import { AccessPolicy, AccessPolicyProvider } from "./AccessContextManager/AccessPolicy.vibe";
import {
  GcpUserAccessBinding,
  GcpUserAccessBindingProvider,
} from "./AccessContextManager/GcpUserAccessBinding.vibe";
import {
  AuthProvider as AgentidentityAuthProvider,
  AuthProviderProvider as AgentidentityAuthProviderProvider,
} from "./AgentIdentity/AuthProvider.ts";
import {
  Binding as AgentregistryBinding,
  BindingProvider as AgentregistryBindingProvider,
} from "./AgentRegistry/Binding.vibe";
import { Agent, AgentProvider } from "./AIPlatform/Agent.ts";
import {
  BatchPredictionJob,
  BatchPredictionJobProvider,
} from "./AIPlatform/BatchPredictionJob.vibe";
import { CachedContent, CachedContentProvider } from "./AIPlatform/CachedContent.vibe";
import { CancelTrainingPipelineHttp } from "./AIPlatform/CancelTrainingPipelineHttp.vibe";
import { CustomJob, CustomJobProvider } from "./AIPlatform/CustomJob.vibe";
import { DataLabelingJob, DataLabelingJobProvider } from "./AIPlatform/DataLabelingJob.vibe";
import {
  Dataset as AIPlatformDataset,
  DatasetProvider as AIPlatformDatasetProvider,
} from "./AIPlatform/Dataset.ts";
import {
  DatasetsDatasetVersion,
  DatasetsDatasetVersionProvider,
} from "./AIPlatform/DatasetsDatasetVersion.ts";
import {
  DeploymentResourcePool,
  DeploymentResourcePoolProvider,
} from "./AIPlatform/DeploymentResourcePool.ts";
import {
  Endpoint as AIPlatformEndpoint,
  EndpointProvider as AIPlatformEndpointProvider,
} from "./AIPlatform/Endpoint.ts";
import { EvaluationItem, EvaluationItemProvider } from "./AIPlatform/EvaluationItem.ts";
import { EvaluationRun, EvaluationRunProvider } from "./AIPlatform/EvaluationRun.ts";
import { EvaluationSet, EvaluationSetProvider } from "./AIPlatform/EvaluationSet.ts";
import { FeatureGroup, FeatureGroupProvider } from "./AIPlatform/FeatureGroup.ts";
import {
  FeatureGroupsFeature,
  FeatureGroupsFeatureProvider,
} from "./AIPlatform/FeatureGroupsFeature.ts";
import { FeatureOnlineStore, FeatureOnlineStoreProvider } from "./AIPlatform/FeatureOnlineStore.ts";
import {
  FeatureOnlineStoresFeatureView,
  FeatureOnlineStoresFeatureViewProvider,
} from "./AIPlatform/FeatureOnlineStoresFeatureView.ts";
import { Featurestore, FeaturestoreProvider } from "./AIPlatform/Featurestore.ts";
import {
  FeaturestoresEntityType,
  FeaturestoresEntityTypeProvider,
} from "./AIPlatform/FeaturestoresEntityType.ts";
import {
  FeaturestoresEntityTypesFeature,
  FeaturestoresEntityTypesFeatureProvider,
} from "./AIPlatform/FeaturestoresEntityTypesFeature.vibe";
import { GenerateContentHttp } from "./AIPlatform/GenerateContentHttp.vibe";
import { GetReasoningEngineHttp } from "./AIPlatform/GetReasoningEngineHttp.vibe";
import { GetSandboxEnvironmentHttp } from "./AIPlatform/GetSandboxEnvironmentHttp.vibe";
import { GetSandboxEnvironmentTemplateHttp } from "./AIPlatform/GetSandboxEnvironmentTemplateHttp.vibe";
import { GetTrainingPipelineHttp } from "./AIPlatform/GetTrainingPipelineHttp.vibe";
import {
  HyperparameterTuningJob,
  HyperparameterTuningJobProvider,
} from "./AIPlatform/HyperparameterTuningJob.vibe";
import { IndexEndpoint, IndexEndpointProvider } from "./AIPlatform/IndexEndpoint.vibe";
import {
  Index as AIPlatformIndex,
  IndexProvider as AIPlatformIndexProvider,
} from "./AIPlatform/Indexes.vibe";
import { MetadataStore, MetadataStoreProvider } from "./AIPlatform/MetadataStore.vibe";
import {
  MetadataStoresArtifact,
  MetadataStoresArtifactProvider,
} from "./AIPlatform/MetadataStoresArtifact.vibe";
import {
  MetadataStoresContext,
  MetadataStoresContextProvider,
} from "./AIPlatform/MetadataStoresContext.vibe";
import {
  MetadataStoresExecution,
  MetadataStoresExecutionProvider,
} from "./AIPlatform/MetadataStoresExecution.vibe";
import {
  ModelDeploymentMonitoringJob,
  ModelDeploymentMonitoringJobProvider,
} from "./AIPlatform/ModelDeploymentMonitoringJob.vibe";
import { NasJob, NasJobProvider } from "./AIPlatform/NasJob.vibe";
import {
  NotebookExecutionJob,
  NotebookExecutionJobProvider,
} from "./AIPlatform/NotebookExecutionJob.vibe";
import {
  NotebookRuntimeTemplate,
  NotebookRuntimeTemplateProvider,
} from "./AIPlatform/NotebookRuntimeTemplate.vibe";
import { OnlineEvaluator, OnlineEvaluatorProvider } from "./AIPlatform/OnlineEvaluator.vibe";
import { PauseSandboxEnvironmentHttp } from "./AIPlatform/PauseSandboxEnvironmentHttp.vibe";
import {
  PersistentResource,
  PersistentResourceProvider,
} from "./AIPlatform/PersistentResource.vibe";
import { PipelineJob, PipelineJobProvider } from "./AIPlatform/PipelineJob.vibe";
import { QueryReasoningEngineHttp } from "./AIPlatform/QueryReasoningEngineHttp.vibe";
import { RagCorpora, RagCorporaProvider } from "./AIPlatform/RagCorpora.vibe";
import { ReasoningEngine, ReasoningEngineProvider } from "./AIPlatform/ReasoningEngine.ts";
import {
  ReasoningEnginesMemory,
  ReasoningEnginesMemoryProvider,
} from "./AIPlatform/ReasoningEnginesMemory.vibe";
import {
  ReasoningEnginesSandboxEnvironment,
  ReasoningEnginesSandboxEnvironmentProvider,
} from "./AIPlatform/ReasoningEnginesSandboxEnvironment.vibe";
import {
  ReasoningEnginesSandboxEnvironmentTemplate,
  ReasoningEnginesSandboxEnvironmentTemplateProvider,
} from "./AIPlatform/ReasoningEnginesSandboxEnvironmentTemplate.ts";
import {
  ReasoningEnginesSession,
  ReasoningEnginesSessionProvider,
} from "./AIPlatform/ReasoningEnginesSession.vibe";
import { ResumeSandboxEnvironmentHttp } from "./AIPlatform/ResumeSandboxEnvironmentHttp.vibe";
import { Schedule, ScheduleProvider } from "./AIPlatform/Schedule.vibe";
import {
  SemanticGovernancePolicy,
  SemanticGovernancePolicyProvider,
} from "./AIPlatform/SemanticGovernancePolicy.vibe";
import { SpecialistPool, SpecialistPoolProvider } from "./AIPlatform/SpecialistPool.vibe";
import { StudiesTrial, StudiesTrialProvider } from "./AIPlatform/StudiesTrial.vibe";
import { Study, StudyProvider } from "./AIPlatform/Study.ts";
import { Tensorboard, TensorboardProvider } from "./AIPlatform/Tensorboard.vibe";
import {
  TensorboardsExperiment,
  TensorboardsExperimentProvider,
} from "./AIPlatform/TensorboardsExperiment.vibe";
import {
  TensorboardsExperimentsRun,
  TensorboardsExperimentsRunProvider,
} from "./AIPlatform/TensorboardsExperimentsRun.vibe";
import {
  TensorboardsExperimentsRunsTimeSeries,
  TensorboardsExperimentsRunsTimeSeriesProvider,
} from "./AIPlatform/TensorboardsExperimentsRunsTimeSeries.vibe";
import { TrainingPipeline, TrainingPipelineProvider } from "./AIPlatform/TrainingPipeline.ts";
import { TuningJob, TuningJobProvider } from "./AIPlatform/TuningJob.vibe";
import {
  Backup as AlloyDbBackup,
  BackupProvider as AlloyDbBackupProvider,
} from "./AlloyDB/Backup.ts";
import {
  Cluster as AlloyDbCluster,
  ClusterProvider as AlloyDbClusterProvider,
} from "./AlloyDB/Cluster.ts";
import {
  ClustersUser as AlloyDbClustersUser,
  ClustersUserProvider as AlloyDbClustersUserProvider,
} from "./AlloyDB/ClustersUser.ts";
import { GetBackupHttp as GetAlloyDbBackupHttp } from "./AlloyDB/GetBackupHttp.vibe";
import { GetClusterHttp as GetAlloyDbClusterHttp } from "./AlloyDB/GetClusterHttp.vibe";
import { GetConnectionInfoHttp as GetAlloyDbConnectionInfoHttp } from "./AlloyDB/GetConnectionInfoHttp.vibe";
import { GetInstanceHttp as GetAlloyDbInstanceHttp } from "./AlloyDB/GetInstanceHttp.vibe";
import { GetUserHttp as GetAlloyDbUserHttp } from "./AlloyDB/GetUserHttp.vibe";
import {
  Instance as AlloyDbInstance,
  InstanceProvider as AlloyDbInstanceProvider,
} from "./AlloyDB/Instance.ts";
import { DataExchange, DataExchangeProvider } from "./AnalyticsHub/DataExchange.vibe";
import {
  DataExchangesListing,
  DataExchangesListingProvider,
} from "./AnalyticsHub/DataExchangesListing.vibe";
import {
  DataExchangesQueryTemplate,
  DataExchangesQueryTemplateProvider,
} from "./AnalyticsHub/DataExchangesQueryTemplate.vibe";
import {
  CustomersConfiguration,
  CustomersConfigurationProvider,
} from "./AndroidDeviceProvisioning/CustomersConfiguration.vibe";
import {
  Storelayoutcluster,
  StorelayoutclusterProvider,
} from "./AndroidEnterprise/Storelayoutcluster.vibe";
import { Storelayoutpage, StorelayoutpageProvider } from "./AndroidEnterprise/Storelayoutpage.vibe";
import { Webapp, WebappProvider } from "./AndroidEnterprise/Webapp.vibe";
import {
  Enterprise as AndroidmanagementEnterprise,
  EnterpriseProvider as AndroidmanagementEnterpriseProvider,
} from "./AndroidManagement/Enterprise.vibe";
import {
  EnterprisesEnrollmentToken,
  EnterprisesEnrollmentTokenProvider,
} from "./AndroidManagement/EnterprisesEnrollmentToken.vibe";
import {
  EnterprisesWebApp,
  EnterprisesWebAppProvider,
} from "./AndroidManagement/EnterprisesWebApp.vibe";
import { Edit, EditProvider } from "./AndroidPublisher/Edit.vibe";
import { Inappproduct, InappproductProvider } from "./AndroidPublisher/Inappproduct.vibe";
import {
  MonetizationSubscription,
  MonetizationSubscriptionProvider,
} from "./AndroidPublisher/MonetizationSubscription.vibe";
import {
  MonetizationSubscriptionsBasePlansOffer,
  MonetizationSubscriptionsBasePlansOfferProvider,
} from "./AndroidPublisher/MonetizationSubscriptionsBasePlansOffer.vibe";
import { ApisConfig, ApisConfigProvider } from "./ApiGateway/ApisConfig.vibe";
import { AnalyticsDatastore, AnalyticsDatastoreProvider } from "./Apigee/AnalyticsDatastore.vibe";
import {
  ApimServiceExtension,
  ApimServiceExtensionProvider,
} from "./Apigee/ApimServiceExtension.vibe";
import { Apiproduct, ApiproductProvider } from "./Apigee/Apiproduct.vibe";
import {
  ApiproductsRateplan,
  ApiproductsRateplanProvider,
} from "./Apigee/ApiproductsRateplan.vibe";
import { ApisKeyvaluemap, ApisKeyvaluemapProvider } from "./Apigee/ApisKeyvaluemap.vibe";
import {
  ApisKeyvaluemapsEntry,
  ApisKeyvaluemapsEntryProvider,
} from "./Apigee/ApisKeyvaluemapsEntry.vibe";
import { Appgroup, AppgroupProvider } from "./Apigee/Appgroup.vibe";
import { AppgroupsApp, AppgroupsAppProvider } from "./Apigee/AppgroupsApp.vibe";
import { AppgroupsAppsKey, AppgroupsAppsKeyProvider } from "./Apigee/AppgroupsAppsKey.vibe";
import { Datacollector, DatacollectorProvider } from "./Apigee/Datacollector.vibe";
import { Developer, DeveloperProvider } from "./Apigee/Developer.vibe";
import { DevelopersApp, DevelopersAppProvider } from "./Apigee/DevelopersApp.vibe";
import { DevelopersAppsKey, DevelopersAppsKeyProvider } from "./Apigee/DevelopersAppsKey.vibe";
import { DnsZone, DnsZoneProvider } from "./Apigee/DnsZone.vibe";
import { EndpointAttachment, EndpointAttachmentProvider } from "./Apigee/EndpointAttachment.vibe";
import { Envgroup, EnvgroupProvider } from "./Apigee/Envgroup.vibe";
import {
  EnvgroupsAttachment,
  EnvgroupsAttachmentProvider,
} from "./Apigee/EnvgroupsAttachment.vibe";
import {
  Environment as ApigeeEnvironment,
  EnvironmentProvider as ApigeeEnvironmentProvider,
} from "./Apigee/Environment.vibe";
import {
  EnvironmentsApisRevisionsDebugsession,
  EnvironmentsApisRevisionsDebugsessionProvider,
} from "./Apigee/EnvironmentsApisRevisionsDebugsession.vibe";
import {
  EnvironmentsArchiveDeployment,
  EnvironmentsArchiveDeploymentProvider,
} from "./Apigee/EnvironmentsArchiveDeployment.ts";
import {
  EnvironmentsKeystore,
  EnvironmentsKeystoreProvider,
} from "./Apigee/EnvironmentsKeystore.vibe";
import {
  EnvironmentsKeystoresAlias,
  EnvironmentsKeystoresAliasProvider,
} from "./Apigee/EnvironmentsKeystoresAlias.vibe";
import {
  EnvironmentsKeyvaluemap,
  EnvironmentsKeyvaluemapProvider,
} from "./Apigee/EnvironmentsKeyvaluemap.vibe";
import {
  EnvironmentsKeyvaluemapsEntry,
  EnvironmentsKeyvaluemapsEntryProvider,
} from "./Apigee/EnvironmentsKeyvaluemapsEntry.vibe";
import {
  EnvironmentsReference,
  EnvironmentsReferenceProvider,
} from "./Apigee/EnvironmentsReference.vibe";
import {
  EnvironmentsResourcefile,
  EnvironmentsResourcefileProvider,
} from "./Apigee/EnvironmentsResourcefile.ts";
import {
  EnvironmentsSecurityAction,
  EnvironmentsSecurityActionProvider,
} from "./Apigee/EnvironmentsSecurityAction.vibe";
import {
  EnvironmentsTargetserver,
  EnvironmentsTargetserverProvider,
} from "./Apigee/EnvironmentsTargetserver.vibe";
import {
  EnvironmentsTraceConfigOverride,
  EnvironmentsTraceConfigOverrideProvider,
} from "./Apigee/EnvironmentsTraceConfigOverride.vibe";
import {
  InstancesAttachment,
  InstancesAttachmentProvider,
} from "./Apigee/InstancesAttachment.vibe";
import {
  InstancesNatAddress,
  InstancesNatAddressProvider,
} from "./Apigee/InstancesNatAddress.vibe";
import { Keyvaluemap, KeyvaluemapProvider } from "./Apigee/Keyvaluemap.vibe";
import { KeyvaluemapsEntry, KeyvaluemapsEntryProvider } from "./Apigee/KeyvaluemapsEntry.vibe";
import { Organization, OrganizationProvider } from "./Apigee/Organization.vibe";
import { SecurityFeedback, SecurityFeedbackProvider } from "./Apigee/SecurityFeedback.vibe";
import {
  SecurityMonitoringCondition,
  SecurityMonitoringConditionProvider,
} from "./Apigee/SecurityMonitoringCondition.vibe";
import { SecurityProfilesV2, SecurityProfilesV2Provider } from "./Apigee/SecurityProfilesV2.vibe";
import { Sharedflow, SharedflowProvider } from "./Apigee/Sharedflow.ts";
import { SitesApicategory, SitesApicategoryProvider } from "./Apigee/SitesApicategory.vibe";
import { SitesApidoc, SitesApidocProvider } from "./Apigee/SitesApidoc.vibe";
import { Api as ApihubApi, ApiProvider as ApihubApiProvider } from "./ApiHub/Api.vibe";
import { ApiHubInstance, ApiHubInstanceProvider } from "./ApiHub/ApiHubInstance.vibe";
import { ApisVersion, ApisVersionProvider } from "./ApiHub/ApisVersion.vibe";
import {
  ApisVersionsOperation,
  ApisVersionsOperationProvider,
} from "./ApiHub/ApisVersionsOperation.vibe";
import { ApisVersionsSpec, ApisVersionsSpecProvider } from "./ApiHub/ApisVersionsSpec.vibe";
import {
  Attribute as ApihubAttribute,
  AttributeProvider as ApihubAttributeProvider,
} from "./ApiHub/Attribute.vibe";
import { Curation, CurationProvider } from "./ApiHub/Curation.vibe";
import { Dependency, DependencyProvider } from "./ApiHub/Dependency.vibe";
import {
  Deployment as ApihubDeployment,
  DeploymentProvider as ApihubDeploymentProvider,
} from "./ApiHub/Deployment.vibe";
import { ExternalApi, ExternalApiProvider } from "./ApiHub/ExternalApi.vibe";
import { Plugin, PluginProvider } from "./ApiHub/Plugin.vibe";
import { PluginsInstance, PluginsInstanceProvider } from "./ApiHub/PluginsInstance.vibe";
import {
  RuntimeProjectAttachment,
  RuntimeProjectAttachmentProvider,
} from "./ApiHub/RuntimeProjectAttachment.vibe";
import { GetKeyStringHttp } from "./ApiKeys/GetKeyStringHttp.vibe";
import { Key, KeyProvider } from "./ApiKeys/Key.vibe";
import { ObservationJob, ObservationJobProvider } from "./Apim/ObservationJob.vibe";
import { ObservationSource, ObservationSourceProvider } from "./Apim/ObservationSource.vibe";
import {
  ApplicationsAuthorizedCertificate,
  ApplicationsAuthorizedCertificateProvider,
} from "./AppEngine/ApplicationsAuthorizedCertificate.vibe";
import {
  ApplicationsDomainMapping,
  ApplicationsDomainMappingProvider,
} from "./AppEngine/ApplicationsDomainMapping.ts";
import {
  AppsAuthorizedCertificate,
  AppsAuthorizedCertificateProvider,
} from "./AppEngine/AppsAuthorizedCertificate.vibe";
import { AppsDomainMapping, AppsDomainMappingProvider } from "./AppEngine/AppsDomainMapping.ts";
import {
  AppsFirewallIngressRule,
  AppsFirewallIngressRuleProvider,
} from "./AppEngine/AppsFirewallIngressRule.vibe";
import {
  AppsServicesVersion,
  AppsServicesVersionProvider,
} from "./AppEngine/AppsServicesVersion.ts";
import { Application, ApplicationProvider } from "./AppHub/Application.vibe";
import {
  ApplicationsService,
  ApplicationsServiceProvider,
} from "./AppHub/ApplicationsService.vibe";
import {
  ApplicationsWorkload,
  ApplicationsWorkloadProvider,
} from "./AppHub/ApplicationsWorkload.vibe";
import {
  ServiceProjectAttachment,
  ServiceProjectAttachmentProvider,
} from "./AppHub/ServiceProjectAttachment.vibe";
import { ListDockerImagesHttp } from "./ArtifactRegistry/ListDockerImagesHttp.vibe";
import {
  RepositoriesAttachment,
  RepositoriesAttachmentProvider,
} from "./ArtifactRegistry/RepositoriesAttachment.vibe";
import {
  RepositoriesPackagesTag,
  RepositoriesPackagesTagProvider,
} from "./ArtifactRegistry/RepositoriesPackagesTag.vibe";
import {
  RepositoriesRule,
  RepositoriesRuleProvider,
} from "./ArtifactRegistry/RepositoriesRule.vibe";
import { Repository, RepositoryProvider } from "./ArtifactRegistry/Repository.vibe";
import {
  Workload as AssuredworkloadsWorkload,
  WorkloadProvider as AssuredworkloadsWorkloadProvider,
} from "./AssuredWorkloads/Workload.vibe";
import {
  BuyersClientsUser,
  BuyersClientsUserProvider,
} from "./AuthorizedBuyersMarketplace/BuyersClientsUser.vibe";
import { GcpAuth } from "./AuthProvider.ts";
import {
  BackupPlan as BackupdrBackupPlan,
  BackupPlanProvider as BackupdrBackupPlanProvider,
} from "./BackupDR/BackupPlan.vibe";
import {
  BackupPlanAssociation,
  BackupPlanAssociationProvider,
} from "./BackupDR/BackupPlanAssociation.vibe";
import {
  BackupVault as BackupdrBackupVault,
  BackupVaultProvider as BackupdrBackupVaultProvider,
} from "./BackupDR/BackupVault.vibe";
import {
  ManagementServer as BackupdrManagementServer,
  ManagementServerProvider as BackupdrManagementServerProvider,
} from "./BackupDR/ManagementServer.vibe";
import {
  NfsShare as BaremetalsolutionNfsShare,
  NfsShareProvider as BaremetalsolutionNfsShareProvider,
} from "./BareMetalSolution/NfsShare.vibe";
import {
  VolumesSnapshot as BaremetalsolutionVolumesSnapshot,
  VolumesSnapshotProvider as BaremetalsolutionVolumesSnapshotProvider,
} from "./BareMetalSolution/VolumesSnapshot.vibe";
import { AppConnection, AppConnectionProvider } from "./BeyondCorp/AppConnection.vibe";
import { AppConnector, AppConnectorProvider } from "./BeyondCorp/AppConnector.vibe";
import { AppGateway, AppGatewayProvider } from "./BeyondCorp/AppGateway.vibe";
import { SecurityGateway, SecurityGatewayProvider } from "./BeyondCorp/SecurityGateway.vibe";
import {
  SecurityGatewaysApplication,
  SecurityGatewaysApplicationProvider,
} from "./BeyondCorp/SecurityGatewaysApplication.vibe";
import {
  Catalog as BiglakeCatalog,
  CatalogProvider as BiglakeCatalogProvider,
} from "./BigLake/Catalog.vibe";
import { CatalogsDatabase, CatalogsDatabaseProvider } from "./BigLake/CatalogsDatabase.vibe";
import {
  CatalogsDatabasesTable,
  CatalogsDatabasesTableProvider,
} from "./BigLake/CatalogsDatabasesTable.vibe";
import { Dataset, DatasetProvider } from "./BigQuery/Dataset.vibe";
import { InsertAllHttp } from "./BigQuery/InsertAllHttp.vibe";
import { Job as BigQueryJob, JobProvider as BigQueryJobProvider } from "./BigQuery/Job.vibe";
import { ListTabledataHttp } from "./BigQuery/ListTabledataHttp.vibe";
import { QueryHttp } from "./BigQuery/QueryHttp.vibe";
import { Routine, RoutineProvider } from "./BigQuery/Routine.vibe";
import { RowAccessPolicy, RowAccessPolicyProvider } from "./BigQuery/RowAccessPolicy.vibe";
import { Table, TableProvider } from "./BigQuery/Table.vibe";
import {
  Connection as BigQueryConnection,
  ConnectionProvider as BigQueryConnectionProvider,
} from "./BigQueryConnection/Connection.vibe";
import { GetConnectionHttp as BigQueryGetConnectionHttp } from "./BigQueryConnection/GetConnectionHttp.vibe";
import { DataPolicy, DataPolicyProvider } from "./BigQueryDataPolicy/DataPolicy.vibe";
import { StartManualRunsHttp } from "./BigQueryDataTransfer/StartManualRunsHttp.vibe";
import { TransferConfig, TransferConfigProvider } from "./BigQueryDataTransfer/TransferConfig.vibe";
import { Assignment, AssignmentProvider } from "./BigQueryReservation/Assignment.vibe";
import {
  CapacityCommitment,
  CapacityCommitmentProvider,
} from "./BigQueryReservation/CapacityCommitment.vibe";
import { Reservation, ReservationProvider } from "./BigQueryReservation/Reservation.vibe";
import {
  ReservationGroup,
  ReservationGroupProvider,
} from "./BigQueryReservation/ReservationGroup.vibe";
import {
  AppProfile as BigtableAppProfile,
  AppProfileProvider as BigtableAppProfileProvider,
} from "./Bigtable/AppProfile.vibe";
import {
  Cluster as BigtableCluster,
  ClusterProvider as BigtableClusterProvider,
} from "./Bigtable/Cluster.ts";
import { GetClusterHttp as GetBigtableClusterHttp } from "./Bigtable/GetClusterHttp.vibe";
import { GetInstanceHttp as GetBigtableInstanceHttp } from "./Bigtable/GetInstanceHttp.vibe";
import { GetTableHttp as GetBigtableTableHttp } from "./Bigtable/GetTableHttp.vibe";
import {
  Instance as BigtableInstance,
  InstanceProvider as BigtableInstanceProvider,
} from "./Bigtable/Instance.ts";
import {
  InstancesClustersBackup as BigtableInstancesClustersBackup,
  InstancesClustersBackupProvider as BigtableInstancesClustersBackupProvider,
} from "./Bigtable/InstancesClustersBackup.ts";
import {
  InstancesLogicalView as BigtableInstancesLogicalView,
  InstancesLogicalViewProvider as BigtableInstancesLogicalViewProvider,
} from "./Bigtable/InstancesLogicalView.ts";
import {
  InstancesMaterializedView as BigtableInstancesMaterializedView,
  InstancesMaterializedViewProvider as BigtableInstancesMaterializedViewProvider,
} from "./Bigtable/InstancesMaterializedView.ts";
import {
  InstancesTablesAuthorizedView as BigtableInstancesTablesAuthorizedView,
  InstancesTablesAuthorizedViewProvider as BigtableInstancesTablesAuthorizedViewProvider,
} from "./Bigtable/InstancesTablesAuthorizedView.ts";
import {
  InstancesTablesSchemaBundle as BigtableInstancesTablesSchemaBundle,
  InstancesTablesSchemaBundleProvider as BigtableInstancesTablesSchemaBundleProvider,
} from "./Bigtable/InstancesTablesSchemaBundle.ts";
import {
  Table as BigtableTable,
  TableProvider as BigtableTableProvider,
} from "./Bigtable/Table.ts";
import { BillingBudget, BillingBudgetProvider } from "./BillingBudgets/BillingBudget.vibe";
import {
  Attestor as BinaryauthorizationAttestor,
  AttestorProvider as BinaryauthorizationAttestorProvider,
} from "./BinaryAuthorization/Attestor.vibe";
import { EvaluateGkePolicyHttp } from "./BinaryAuthorization/EvaluateGkePolicyHttp.vibe";
import { GetAttestorHttp } from "./BinaryAuthorization/GetAttestorHttp.vibe";
import { GetPlatformsPolicyHttp } from "./BinaryAuthorization/GetPlatformsPolicyHttp.vibe";
import {
  PlatformsPolicy,
  PlatformsPolicyProvider,
} from "./BinaryAuthorization/PlatformsPolicy.vibe";
import { ValidateAttestationHttp } from "./BinaryAuthorization/ValidateAttestationHttp.vibe";
import { BlockchainNode, BlockchainNodeProvider } from "./BlockchainNodeEngine/BlockchainNode.vibe";
import { Certificate, CertificateProvider } from "./CertificateManager/Certificate.ts";
import {
  CertificateIssuanceConfig,
  CertificateIssuanceConfigProvider,
} from "./CertificateManager/CertificateIssuanceConfig.ts";
import { CertificateMap, CertificateMapProvider } from "./CertificateManager/CertificateMap.ts";
import {
  CertificateMapEntry,
  CertificateMapEntryProvider,
} from "./CertificateManager/CertificateMapEntry.ts";
import {
  DnsAuthorization,
  DnsAuthorizationProvider,
} from "./CertificateManager/DnsAuthorization.ts";
import { TrustConfig, TrustConfigProvider } from "./CertificateManager/TrustConfig.ts";
import { App as CesApp, AppProvider as CesAppProvider } from "./CES/App.vibe";
import { AppsAgent, AppsAgentProvider } from "./CES/AppsAgent.vibe";
import { AppsDeployment, AppsDeploymentProvider } from "./CES/AppsDeployment.vibe";
import { AppsExample, AppsExampleProvider } from "./CES/AppsExample.vibe";
import { AppsGuardrail, AppsGuardrailProvider } from "./CES/AppsGuardrail.vibe";
import { AppsTool, AppsToolProvider } from "./CES/AppsTool.vibe";
import { AppsToolset, AppsToolsetProvider } from "./CES/AppsToolset.vibe";
import { AppsVersion, AppsVersionProvider } from "./CES/AppsVersion.vibe";
import {
  CustomersConnectorConfig,
  CustomersConnectorConfigProvider,
} from "./ChromeManagement/CustomersConnectorConfig.vibe";
import {
  Feed as CloudassetFeed,
  FeedProvider as CloudassetFeedProvider,
} from "./CloudAsset/Feed.vibe";
import {
  SavedQuery as CloudassetSavedQuery,
  SavedQueryProvider as CloudassetSavedQueryProvider,
} from "./CloudAsset/SavedQuery.vibe";
import { AccessReadTokenHttp as CloudBuildAccessReadTokenHttp } from "./CloudBuild/AccessReadTokenHttp.vibe";
import { AccessReadWriteTokenHttp as CloudBuildAccessReadWriteTokenHttp } from "./CloudBuild/AccessReadWriteTokenHttp.vibe";
import {
  Connection as CloudBuildConnection,
  ConnectionProvider as CloudBuildConnectionProvider,
} from "./CloudBuild/Connection.ts";
import { FetchGitRefsHttp as CloudBuildFetchGitRefsHttp } from "./CloudBuild/FetchGitRefsHttp.vibe";
import {
  Repository as CloudBuildRepository,
  RepositoryProvider as CloudBuildRepositoryProvider,
} from "./CloudBuild/Repository.ts";
import {
  ChannelPartnerLinksChannelPartnerRepricingConfig,
  ChannelPartnerLinksChannelPartnerRepricingConfigProvider,
} from "./CloudChannel/ChannelPartnerLinksChannelPartnerRepricingConfig.vibe";
import {
  ChannelPartnerLinksCustomer,
  ChannelPartnerLinksCustomerProvider,
} from "./CloudChannel/ChannelPartnerLinksCustomer.vibe";
import {
  Customer as CloudchannelCustomer,
  CustomerProvider as CloudchannelCustomerProvider,
} from "./CloudChannel/Customer.vibe";
import {
  CustomersCustomerRepricingConfig,
  CustomersCustomerRepricingConfigProvider,
} from "./CloudChannel/CustomersCustomerRepricingConfig.vibe";
import {
  Customer as CloudcontrolspartnerCustomer,
  CustomerProvider as CloudcontrolspartnerCustomerProvider,
} from "./CloudControlsPartner/Customer.vibe";
import { CustomTargetType, CustomTargetTypeProvider } from "./CloudDeploy/CustomTargetType.vibe";
import { DeliveryPipeline, DeliveryPipelineProvider } from "./CloudDeploy/DeliveryPipeline.vibe";
import {
  DeliveryPipelinesAutomation,
  DeliveryPipelinesAutomationProvider,
} from "./CloudDeploy/DeliveryPipelinesAutomation.vibe";
import { DeployPolicy, DeployPolicyProvider } from "./CloudDeploy/DeployPolicy.vibe";
import {
  Target as ClouddeployTarget,
  TargetProvider as ClouddeployTargetProvider,
} from "./CloudDeploy/Target.vibe";
import { Function as CloudFunction, FunctionProvider } from "./CloudFunctions/Function.ts";
import { GenerateDownloadUrlHttp } from "./CloudFunctions/GenerateDownloadUrlHttp.vibe";
import { GetFunctionHttp } from "./CloudFunctions/GetFunctionHttp.vibe";
import {
  Device as CloudidentityDevice,
  DeviceProvider as CloudidentityDeviceProvider,
} from "./CloudIdentity/Device.vibe";
import {
  Group as CloudidentityGroup,
  GroupProvider as CloudidentityGroupProvider,
} from "./CloudIdentity/Group.vibe";
import { GroupsMembership, GroupsMembershipProvider } from "./CloudIdentity/GroupsMembership.vibe";
import {
  InboundOidcSsoProfile,
  InboundOidcSsoProfileProvider,
} from "./CloudIdentity/InboundOidcSsoProfile.vibe";
import {
  InboundSamlSsoProfile,
  InboundSamlSsoProfileProvider,
} from "./CloudIdentity/InboundSamlSsoProfile.vibe";
import {
  InboundSsoAssignment,
  InboundSsoAssignmentProvider,
} from "./CloudIdentity/InboundSsoAssignment.vibe";
import { CustomRange, CustomRangeProvider } from "./CloudNumberRegistry/CustomRange.vibe";
import { IpamAdminScope, IpamAdminScopeProvider } from "./CloudNumberRegistry/IpamAdminScope.vibe";
import { Realm, RealmProvider } from "./CloudNumberRegistry/Realm.vibe";
import { RegistryBook, RegistryBookProvider } from "./CloudNumberRegistry/RegistryBook.vibe";
import { Job, JobProvider } from "./CloudScheduler/Job.ts";
import { PauseJobHttp } from "./CloudScheduler/PauseJobHttp.vibe";
import { ResumeJobHttp } from "./CloudScheduler/ResumeJobHttp.vibe";
import { RunJobHttp } from "./CloudScheduler/RunJobHttp.vibe";
import {
  SettingsDatasource,
  SettingsDatasourceProvider,
} from "./CloudSearch/SettingsDatasource.vibe";
import {
  SettingsSearchapplication,
  SettingsSearchapplicationProvider,
} from "./CloudSearch/SettingsSearchapplication.vibe";
import {
  SupportEventSubscription,
  SupportEventSubscriptionProvider,
} from "./CloudSupport/SupportEventSubscription.vibe";
import { CreateTaskHttp } from "./CloudTasks/CreateTaskHttp.vibe";
import { Queue, QueueProvider } from "./CloudTasks/Queue.vibe";
import {
  Environment as ComposerEnvironment,
  EnvironmentProvider as ComposerEnvironmentProvider,
} from "./Composer/Environment.ts";
import {
  EnvironmentsUserWorkloadsConfigMap,
  EnvironmentsUserWorkloadsConfigMapProvider,
} from "./Composer/EnvironmentsUserWorkloadsConfigMap.ts";
import {
  EnvironmentsUserWorkloadsSecret,
  EnvironmentsUserWorkloadsSecretProvider,
} from "./Composer/EnvironmentsUserWorkloadsSecret.ts";
import { ExecuteAirflowCommandHttp } from "./Composer/ExecuteAirflowCommandHttp.vibe";
import { GetEnvironmentHttp } from "./Composer/GetEnvironmentHttp.vibe";
import { GetUserWorkloadsConfigMapHttp } from "./Composer/GetUserWorkloadsConfigMapHttp.vibe";
import { GetUserWorkloadsSecretHttp } from "./Composer/GetUserWorkloadsSecretHttp.vibe";
import { Address, AddressProvider } from "./Compute/Address.vibe";
import { Autoscaler, AutoscalerProvider } from "./Compute/Autoscaler.ts";
import { BackendBucket, BackendBucketProvider } from "./Compute/BackendBucket.vibe";
import { BackendService, BackendServiceProvider } from "./Compute/BackendService.vibe";
import { CrossSiteNetwork, CrossSiteNetworkProvider } from "./Compute/CrossSiteNetwork.vibe";
import { Disk, DiskProvider } from "./Compute/Disk.vibe";
import { ExternalVpnGateway, ExternalVpnGatewayProvider } from "./Compute/ExternalVpnGateway.ts";
import { Firewall, FirewallProvider } from "./Compute/Firewall.vibe";
import { FirewallPolicy, FirewallPolicyProvider } from "./Compute/FirewallPolicy.ts";
import { ForwardingRule, ForwardingRuleProvider } from "./Compute/ForwardingRule.ts";
import { FutureReservation, FutureReservationProvider } from "./Compute/FutureReservation.vibe";
import { GetInstanceHttp } from "./Compute/GetInstanceHttp.vibe";
import { GlobalAddress, GlobalAddressProvider } from "./Compute/GlobalAddress.vibe";
import {
  GlobalForwardingRule,
  GlobalForwardingRuleProvider,
} from "./Compute/GlobalForwardingRule.ts";
import {
  GlobalNetworkEndpointGroup,
  GlobalNetworkEndpointGroupProvider,
} from "./Compute/GlobalNetworkEndpointGroup.ts";
import {
  GlobalPublicDelegatedPrefix,
  GlobalPublicDelegatedPrefixProvider,
} from "./Compute/GlobalPublicDelegatedPrefix.vibe";
import {
  GlobalVmExtensionPolicy,
  GlobalVmExtensionPolicyProvider,
} from "./Compute/GlobalVmExtensionPolicy.ts";
import { HealthCheck, HealthCheckProvider } from "./Compute/HealthCheck.vibe";
import { HttpHealthCheck, HttpHealthCheckProvider } from "./Compute/HttpHealthCheck.vibe";
import { HttpsHealthCheck, HttpsHealthCheckProvider } from "./Compute/HttpsHealthCheck.vibe";
import { Image, ImageProvider } from "./Compute/Image.vibe";
import { Instance, InstanceProvider } from "./Compute/Instance.vibe";
import { InstanceGroup, InstanceGroupProvider } from "./Compute/InstanceGroup.ts";
import {
  InstanceGroupManager,
  InstanceGroupManagerProvider,
} from "./Compute/InstanceGroupManager.ts";
import {
  InstanceGroupManagerResizeRequest,
  InstanceGroupManagerResizeRequestProvider,
} from "./Compute/InstanceGroupManagerResizeRequest.vibe";
import { InstanceTemplate, InstanceTemplateProvider } from "./Compute/InstanceTemplate.ts";
import { InstantSnapshot, InstantSnapshotProvider } from "./Compute/InstantSnapshot.vibe";
import {
  InstantSnapshotGroup,
  InstantSnapshotGroupProvider,
} from "./Compute/InstantSnapshotGroup.vibe";
import { Interconnect, InterconnectProvider } from "./Compute/Interconnect.ts";
import {
  InterconnectAttachment,
  InterconnectAttachmentProvider,
} from "./Compute/InterconnectAttachment.ts";
import {
  InterconnectAttachmentGroup,
  InterconnectAttachmentGroupProvider,
} from "./Compute/InterconnectAttachmentGroup.ts";
import { InterconnectGroup, InterconnectGroupProvider } from "./Compute/InterconnectGroup.ts";
import { License, LicenseProvider } from "./Compute/License.ts";
import { MachineImage, MachineImageProvider } from "./Compute/MachineImage.vibe";
import { Network, NetworkProvider } from "./Compute/Network.ts";
import { NetworkAttachment, NetworkAttachmentProvider } from "./Compute/NetworkAttachment.ts";
import {
  NetworkEdgeSecurityService,
  NetworkEdgeSecurityServiceProvider,
} from "./Compute/NetworkEdgeSecurityService.ts";
import {
  NetworkEndpointGroup,
  NetworkEndpointGroupProvider,
} from "./Compute/NetworkEndpointGroup.ts";
import {
  NetworkFirewallPolicy,
  NetworkFirewallPolicyProvider,
} from "./Compute/NetworkFirewallPolicy.ts";
import { NodeGroup, NodeGroupProvider } from "./Compute/NodeGroup.ts";
import { NodeTemplate, NodeTemplateProvider } from "./Compute/NodeTemplate.ts";
import {
  OrganizationSecurityPolicy,
  OrganizationSecurityPolicyProvider,
} from "./Compute/OrganizationSecurityPolicy.vibe";
import { PacketMirroring, PacketMirroringProvider } from "./Compute/PacketMirroring.vibe";
import {
  PublicAdvertisedPrefix,
  PublicAdvertisedPrefixProvider,
} from "./Compute/PublicAdvertisedPrefix.vibe";
import {
  PublicDelegatedPrefix,
  PublicDelegatedPrefixProvider,
} from "./Compute/PublicDelegatedPrefix.vibe";
import { RegionAutoscaler, RegionAutoscalerProvider } from "./Compute/RegionAutoscaler.ts";
import {
  RegionBackendBucket,
  RegionBackendBucketProvider,
} from "./Compute/RegionBackendBucket.vibe";
import {
  RegionBackendService,
  RegionBackendServiceProvider,
} from "./Compute/RegionBackendService.ts";
import {
  RegionCompositeHealthCheck,
  RegionCompositeHealthCheckProvider,
} from "./Compute/RegionCompositeHealthCheck.vibe";
import { RegionDisk, RegionDiskProvider } from "./Compute/RegionDisk.vibe";
import {
  RegionHealthAggregationPolicy,
  RegionHealthAggregationPolicyProvider,
} from "./Compute/RegionHealthAggregationPolicy.vibe";
import { RegionHealthCheck, RegionHealthCheckProvider } from "./Compute/RegionHealthCheck.vibe";
import {
  RegionHealthCheckService,
  RegionHealthCheckServiceProvider,
} from "./Compute/RegionHealthCheckService.vibe";
import { RegionHealthSource, RegionHealthSourceProvider } from "./Compute/RegionHealthSource.vibe";
import {
  RegionInstanceGroupManager,
  RegionInstanceGroupManagerProvider,
} from "./Compute/RegionInstanceGroupManager.ts";
import {
  RegionInstanceGroupManagerResizeRequest,
  RegionInstanceGroupManagerResizeRequestProvider,
} from "./Compute/RegionInstanceGroupManagerResizeRequest.vibe";
import {
  RegionInstanceTemplate,
  RegionInstanceTemplateProvider,
} from "./Compute/RegionInstanceTemplate.vibe";
import {
  RegionInstantSnapshot,
  RegionInstantSnapshotProvider,
} from "./Compute/RegionInstantSnapshot.vibe";
import {
  RegionInstantSnapshotGroup,
  RegionInstantSnapshotGroupProvider,
} from "./Compute/RegionInstantSnapshotGroup.vibe";
import {
  RegionNetworkEndpointGroup,
  RegionNetworkEndpointGroupProvider,
} from "./Compute/RegionNetworkEndpointGroup.ts";
import {
  RegionNetworkFirewallPolicy,
  RegionNetworkFirewallPolicyProvider,
} from "./Compute/RegionNetworkFirewallPolicy.ts";
import {
  RegionNotificationEndpoint,
  RegionNotificationEndpointProvider,
} from "./Compute/RegionNotificationEndpoint.vibe";
import {
  RegionSecurityPolicy,
  RegionSecurityPolicyProvider,
} from "./Compute/RegionSecurityPolicy.ts";
import { RegionSnapshot, RegionSnapshotProvider } from "./Compute/RegionSnapshot.vibe";
import {
  RegionSslCertificate,
  RegionSslCertificateProvider,
} from "./Compute/RegionSslCertificate.vibe";
import { RegionSslPolicy, RegionSslPolicyProvider } from "./Compute/RegionSslPolicy.vibe";
import {
  RegionTargetHttpProxy,
  RegionTargetHttpProxyProvider,
} from "./Compute/RegionTargetHttpProxy.vibe";
import {
  RegionTargetHttpsProxy,
  RegionTargetHttpsProxyProvider,
} from "./Compute/RegionTargetHttpsProxy.vibe";
import {
  RegionTargetTcpProxy,
  RegionTargetTcpProxyProvider,
} from "./Compute/RegionTargetTcpProxy.ts";
import { RegionUrlMap, RegionUrlMapProvider } from "./Compute/RegionUrlMap.vibe";
import {
  Reservation as ComputeReservation,
  ReservationProvider as ComputeReservationProvider,
} from "./Compute/Reservation.vibe";
import { ResourcePolicy, ResourcePolicyProvider } from "./Compute/ResourcePolicy.vibe";
import { RolloutPlan, RolloutPlanProvider } from "./Compute/RolloutPlan.ts";
import { Route, RouteProvider } from "./Compute/Route.vibe";
import { Router, RouterProvider } from "./Compute/Router.ts";
import { SecurityPolicy, SecurityPolicyProvider } from "./Compute/SecurityPolicy.ts";
import { ServiceAttachment, ServiceAttachmentProvider } from "./Compute/ServiceAttachment.ts";
import { Snapshot, SnapshotProvider } from "./Compute/Snapshot.vibe";
import { SslCertificate, SslCertificateProvider } from "./Compute/SslCertificate.vibe";
import { SslPolicy, SslPolicyProvider } from "./Compute/SslPolicy.vibe";
import { StartInstanceHttp } from "./Compute/StartInstanceHttp.vibe";
import { StopInstanceHttp } from "./Compute/StopInstanceHttp.vibe";
import { StoragePool, StoragePoolProvider } from "./Compute/StoragePool.vibe";
import { Subnetwork, SubnetworkProvider } from "./Compute/Subnetwork.vibe";
import { TargetGrpcProxy, TargetGrpcProxyProvider } from "./Compute/TargetGrpcProxy.vibe";
import { TargetHttpProxy, TargetHttpProxyProvider } from "./Compute/TargetHttpProxy.vibe";
import { TargetHttpsProxy, TargetHttpsProxyProvider } from "./Compute/TargetHttpsProxy.vibe";
import { TargetInstance, TargetInstanceProvider } from "./Compute/TargetInstance.ts";
import { TargetPool, TargetPoolProvider } from "./Compute/TargetPool.ts";
import { TargetSslProxy, TargetSslProxyProvider } from "./Compute/TargetSslProxy.vibe";
import { TargetTcpProxy, TargetTcpProxyProvider } from "./Compute/TargetTcpProxy.vibe";
import { TargetVpnGateway, TargetVpnGatewayProvider } from "./Compute/TargetVpnGateway.ts";
import { UrlMap, UrlMapProvider } from "./Compute/UrlMap.vibe";
import { VpnGateway, VpnGatewayProvider } from "./Compute/VpnGateway.ts";
import { VpnTunnel, VpnTunnelProvider } from "./Compute/VpnTunnel.ts";
import { WireGroup, WireGroupProvider } from "./Compute/WireGroup.ts";
import {
  ZoneVmExtensionPolicy,
  ZoneVmExtensionPolicyProvider,
} from "./Compute/ZoneVmExtensionPolicy.vibe";
import {
  DeploymentGroup as ConfigDeploymentGroup,
  DeploymentGroupProvider as ConfigDeploymentGroupProvider,
} from "./Config/DeploymentGroup.vibe";
import {
  Preview as ConfigPreview,
  PreviewProvider as ConfigPreviewProvider,
} from "./Config/Preview.vibe";
import {
  ConnectionsEntityTypesEntity,
  ConnectionsEntityTypesEntityProvider,
} from "./Connectors/ConnectionsEntityTypesEntity.vibe";
import { GetEntityHttp } from "./Connectors/GetEntityHttp.vibe";
import { ContactCenter, ContactCenterProvider } from "./ContactCenterAIPlatform/ContactCenter.vibe";
import { AnalysisRule, AnalysisRuleProvider } from "./ContactCenterInsights/AnalysisRule.vibe";
import {
  AssessmentRule,
  AssessmentRuleProvider,
} from "./ContactCenterInsights/AssessmentRule.vibe";
import {
  AuthorizedViewSet,
  AuthorizedViewSetProvider,
} from "./ContactCenterInsights/AuthorizedViewSet.vibe";
import {
  AuthorizedViewSetsAuthorizedView,
  AuthorizedViewSetsAuthorizedViewProvider,
} from "./ContactCenterInsights/AuthorizedViewSetsAuthorizedView.vibe";
import {
  AuthorizedViewSetsAuthorizedViewsConversationsAssessment,
  AuthorizedViewSetsAuthorizedViewsConversationsAssessmentProvider,
} from "./ContactCenterInsights/AuthorizedViewSetsAuthorizedViewsConversationsAssessment.vibe";
import {
  AuthorizedViewSetsAuthorizedViewsConversationsFeedbackLabel,
  AuthorizedViewSetsAuthorizedViewsConversationsFeedbackLabelProvider,
} from "./ContactCenterInsights/AuthorizedViewSetsAuthorizedViewsConversationsFeedbackLabel.vibe";
import {
  AutoLabelingRule,
  AutoLabelingRuleProvider,
} from "./ContactCenterInsights/AutoLabelingRule.vibe";
import { Conversation, ConversationProvider } from "./ContactCenterInsights/Conversation.vibe";
import {
  ConversationsAnalyses,
  ConversationsAnalysesProvider,
} from "./ContactCenterInsights/ConversationsAnalyses.vibe";
import {
  ConversationsAssessment,
  ConversationsAssessmentProvider,
} from "./ContactCenterInsights/ConversationsAssessment.vibe";
import {
  ConversationsFeedbackLabel,
  ConversationsFeedbackLabelProvider,
} from "./ContactCenterInsights/ConversationsFeedbackLabel.vibe";
import { Dashboard, DashboardProvider } from "./ContactCenterInsights/Dashboard.vibe";
import {
  DashboardsChart,
  DashboardsChartProvider,
} from "./ContactCenterInsights/DashboardsChart.vibe";
import {
  DatasetsConversationsFeedbackLabel,
  DatasetsConversationsFeedbackLabelProvider,
} from "./ContactCenterInsights/DatasetsConversationsFeedbackLabel.vibe";
import { IssueModel, IssueModelProvider } from "./ContactCenterInsights/IssueModel.vibe";
import {
  IssueModelsIssue,
  IssueModelsIssueProvider,
} from "./ContactCenterInsights/IssueModelsIssue.vibe";
import { PhraseMatcher, PhraseMatcherProvider } from "./ContactCenterInsights/PhraseMatcher.vibe";
import { QaQuestionTag, QaQuestionTagProvider } from "./ContactCenterInsights/QaQuestionTag.vibe";
import { QaScorecard, QaScorecardProvider } from "./ContactCenterInsights/QaScorecard.vibe";
import {
  QaScorecardsRevision,
  QaScorecardsRevisionProvider,
} from "./ContactCenterInsights/QaScorecardsRevision.vibe";
import {
  QaScorecardsRevisionsQaQuestion,
  QaScorecardsRevisionsQaQuestionProvider,
} from "./ContactCenterInsights/QaScorecardsRevisionsQaQuestion.vibe";
import { View, ViewProvider } from "./ContactCenterInsights/View.vibe";
import { Cluster, ClusterProvider } from "./Container/Cluster.ts";
import { ClustersNodePool, ClustersNodePoolProvider } from "./Container/ClustersNodePool.ts";
import { GetClusterHttp } from "./Container/GetClusterHttp.vibe";
import { GetClustersNodePoolHttp } from "./Container/GetClustersNodePoolHttp.vibe";
import { GetNodePoolHttp } from "./Container/GetNodePoolHttp.vibe";
import { GkeKubernetesAdapter } from "./Container/KubernetesAdapter.ts";
import { NodePool, NodePoolProvider } from "./Container/NodePool.ts";
import { GetNoteHttp } from "./ContainerAnalysis/GetNoteHttp.vibe";
import { GetOccurrenceHttp } from "./ContainerAnalysis/GetOccurrenceHttp.vibe";
import { LocationsNote, LocationsNoteProvider } from "./ContainerAnalysis/LocationsNote.vibe";
import {
  LocationsOccurrence,
  LocationsOccurrenceProvider,
} from "./ContainerAnalysis/LocationsOccurrence.vibe";
import {
  Note as ContaineranalysisNote,
  NoteProvider as ContaineranalysisNoteProvider,
} from "./ContainerAnalysis/Note.vibe";
import {
  Occurrence as ContaineranalysisOccurrence,
  OccurrenceProvider as ContaineranalysisOccurrenceProvider,
} from "./ContainerAnalysis/Occurrence.vibe";
import {
  Document as ContentwarehouseDocument,
  DocumentProvider as ContentwarehouseDocumentProvider,
} from "./ContentWarehouse/Document.vibe";
import {
  DocumentSchema as ContentwarehouseDocumentSchema,
  DocumentSchemaProvider as ContentwarehouseDocumentSchemaProvider,
} from "./ContentWarehouse/DocumentSchema.ts";
import { GetDocumentHttp as GetContentwarehouseDocumentHttp } from "./ContentWarehouse/GetDocumentHttp.vibe";
import { GetDocumentSchemaHttp } from "./ContentWarehouse/GetDocumentSchemaHttp.vibe";
import { GetRuleSetHttp } from "./ContentWarehouse/GetRuleSetHttp.vibe";
import { GetSynonymSetHttp } from "./ContentWarehouse/GetSynonymSetHttp.vibe";
import {
  RuleSet as ContentwarehouseRuleSet,
  RuleSetProvider as ContentwarehouseRuleSetProvider,
} from "./ContentWarehouse/RuleSet.ts";
import {
  SynonymSet as ContentwarehouseSynonymSet,
  SynonymSetProvider as ContentwarehouseSynonymSetProvider,
} from "./ContentWarehouse/SynonymSet.vibe";
import * as Credentials from "./Credentials.ts";
import { TagTemplate, TagTemplateProvider } from "./DataCatalog/TagTemplate.vibe";
import {
  TaxonomiesPolicyTag,
  TaxonomiesPolicyTagProvider,
} from "./DataCatalog/TaxonomiesPolicyTag.vibe";
import { Taxonomy, TaxonomyProvider } from "./DataCatalog/Taxonomy.vibe";
import {
  ProjectsLocationsFolder,
  ProjectsLocationsFolderProvider,
} from "./Dataform/ProjectsLocationsFolder.vibe";
import {
  RepositoriesReleaseConfig,
  RepositoriesReleaseConfigProvider,
} from "./Dataform/RepositoriesReleaseConfig.vibe";
import {
  RepositoriesWorkflowConfig,
  RepositoriesWorkflowConfigProvider,
} from "./Dataform/RepositoriesWorkflowConfig.vibe";
import {
  RepositoriesWorkflowInvocation,
  RepositoriesWorkflowInvocationProvider,
} from "./Dataform/RepositoriesWorkflowInvocation.vibe";
import {
  RepositoriesWorkspace,
  RepositoriesWorkspaceProvider,
} from "./Dataform/RepositoriesWorkspace.vibe";
import {
  Repository as DataformRepository,
  RepositoryProvider as DataformRepositoryProvider,
} from "./Dataform/Repository.vibe";
import { Team, TeamProvider } from "./Dataform/Team.vibe";
import {
  AnnotationSpecSet as DatalabelingAnnotationSpecSet,
  AnnotationSpecSetProvider as DatalabelingAnnotationSpecSetProvider,
} from "./DataLabeling/AnnotationSpecSet.vibe";
import {
  Dataset as DatalabelingDataset,
  DatasetProvider as DatalabelingDatasetProvider,
} from "./DataLabeling/Dataset.vibe";
import {
  DatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessage,
  DatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessageProvider,
} from "./DataLabeling/DatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessage.vibe";
import {
  EvaluationJob as DatalabelingEvaluationJob,
  EvaluationJobProvider as DatalabelingEvaluationJobProvider,
} from "./DataLabeling/EvaluationJob.vibe";
import {
  Instruction as DatalabelingInstruction,
  InstructionProvider as DatalabelingInstructionProvider,
} from "./DataLabeling/Instruction.vibe";
import { Process, ProcessProvider } from "./DataLineage/Process.vibe";
import { ProcessesRun, ProcessesRunProvider } from "./DataLineage/ProcessesRun.vibe";
import {
  ProcessesRunsLineageEvent,
  ProcessesRunsLineageEventProvider,
} from "./DataLineage/ProcessesRunsLineageEvent.vibe";
import {
  AccountTypesUserList,
  AccountTypesUserListProvider,
} from "./DataManager/AccountTypesUserList.vibe";
import {
  ConnectionProfile as DatamigrationConnectionProfile,
  ConnectionProfileProvider as DatamigrationConnectionProfileProvider,
} from "./DataMigration/ConnectionProfile.vibe";
import {
  ConversionWorkspace as DatamigrationConversionWorkspace,
  ConversionWorkspaceProvider as DatamigrationConversionWorkspaceProvider,
} from "./DataMigration/ConversionWorkspace.vibe";
import {
  ConversionWorkspacesMappingRule,
  ConversionWorkspacesMappingRuleProvider,
} from "./DataMigration/ConversionWorkspacesMappingRule.vibe";
import {
  MigrationJob as DatamigrationMigrationJob,
  MigrationJobProvider as DatamigrationMigrationJobProvider,
} from "./DataMigration/MigrationJob.vibe";
import {
  PrivateConnection as DatamigrationPrivateConnection,
  PrivateConnectionProvider as DatamigrationPrivateConnectionProvider,
} from "./DataMigration/PrivateConnection.vibe";
import {
  Pipeline as DatapipelinesPipeline,
  PipelineProvider as DatapipelinesPipelineProvider,
} from "./DataPipelines/Pipeline.vibe";
import { RunPipelineHttp } from "./DataPipelines/RunPipelineHttp.vibe";
import { StopPipelineHttp } from "./DataPipelines/StopPipelineHttp.vibe";
import { AspectType, AspectTypeProvider } from "./Dataplex/AspectType.vibe";
import { DataDomain, DataDomainProvider } from "./Dataplex/DataDomain.vibe";
import { DataDomainsBinding, DataDomainsBindingProvider } from "./Dataplex/DataDomainsBinding.vibe";
import { DataProduct, DataProductProvider } from "./Dataplex/DataProduct.vibe";
import {
  DataProductsDataAsset,
  DataProductsDataAssetProvider,
} from "./Dataplex/DataProductsDataAsset.vibe";
import { DataScan, DataScanProvider } from "./Dataplex/DataScan.vibe";
import { EncryptionConfig, EncryptionConfigProvider } from "./Dataplex/EncryptionConfig.vibe";
import { EntryGroup, EntryGroupProvider } from "./Dataplex/EntryGroup.vibe";
import { EntryGroupsEntry, EntryGroupsEntryProvider } from "./Dataplex/EntryGroupsEntry.vibe";
import {
  EntryGroupsEntryLink,
  EntryGroupsEntryLinkProvider,
} from "./Dataplex/EntryGroupsEntryLink.vibe";
import { EntryType, EntryTypeProvider } from "./Dataplex/EntryType.vibe";
import { GlossariesCategory, GlossariesCategoryProvider } from "./Dataplex/GlossariesCategory.vibe";
import { GlossariesTerm, GlossariesTermProvider } from "./Dataplex/GlossariesTerm.vibe";
import { Glossary, GlossaryProvider } from "./Dataplex/Glossary.vibe";
import { Lake, LakeProvider } from "./Dataplex/Lake.ts";
import { LakesAsset, LakesAssetProvider } from "./Dataplex/LakesAsset.ts";
import {
  LakesEntitiesPartition,
  LakesEntitiesPartitionProvider,
} from "./Dataplex/LakesEntitiesPartition.vibe";
import { LakesEntity, LakesEntityProvider } from "./Dataplex/LakesEntity.vibe";
import { LakesTask, LakesTaskProvider } from "./Dataplex/LakesTask.ts";
import { LakesZone, LakesZoneProvider } from "./Dataplex/LakesZone.ts";
import { MetadataFeed, MetadataFeedProvider } from "./Dataplex/MetadataFeed.ts";
import {
  AutoscalingPolicy as DataprocAutoscalingPolicy,
  AutoscalingPolicyProvider as DataprocAutoscalingPolicyProvider,
} from "./Dataproc/AutoscalingPolicy.vibe";
import {
  Batch as DataprocBatche,
  BatchProvider as DataprocBatcheProvider,
} from "./Dataproc/Batch.vibe";
import {
  Cluster as DataprocCluster,
  ClusterProvider as DataprocClusterProvider,
} from "./Dataproc/Cluster.ts";
import { GetClusterHttp as GetDataprocClusterHttp } from "./Dataproc/GetClusterHttp.vibe";
import {
  RegionsAutoscalingPolicy as DataprocRegionsAutoscalingPolicy,
  RegionsAutoscalingPolicyProvider as DataprocRegionsAutoscalingPolicyProvider,
} from "./Dataproc/RegionsAutoscalingPolicy.vibe";
import {
  RegionsWorkflowTemplate as DataprocRegionsWorkflowTemplate,
  RegionsWorkflowTemplateProvider as DataprocRegionsWorkflowTemplateProvider,
} from "./Dataproc/RegionsWorkflowTemplate.vibe";
import {
  Session as DataprocSession,
  SessionProvider as DataprocSessionProvider,
} from "./Dataproc/Session.vibe";
import {
  SessionTemplate as DataprocSessionTemplate,
  SessionTemplateProvider as DataprocSessionTemplateProvider,
} from "./Dataproc/SessionTemplate.vibe";
import { SubmitJobHttp as DataprocSubmitJobHttp } from "./Dataproc/SubmitJobHttp.vibe";
import {
  WorkflowTemplate as DataprocWorkflowTemplate,
  WorkflowTemplateProvider as DataprocWorkflowTemplateProvider,
} from "./Dataproc/WorkflowTemplate.vibe";
import { CommitHttp } from "./Datastore/CommitHttp.vibe";
import {
  Index as DatastoreIndex,
  IndexProvider as DatastoreIndexProvider,
} from "./Datastore/Indexes.vibe";
import { LookupHttp } from "./Datastore/LookupHttp.vibe";
import { RunQueryHttp } from "./Datastore/RunQueryHttp.vibe";
import {
  ConnectionProfile as DatastreamConnectionProfile,
  ConnectionProfileProvider as DatastreamConnectionProfileProvider,
} from "./Datastream/ConnectionProfile.vibe";
import {
  PrivateConnection as DatastreamPrivateConnection,
  PrivateConnectionProvider as DatastreamPrivateConnectionProvider,
} from "./Datastream/PrivateConnection.ts";
import {
  PrivateConnectionsRoute,
  PrivateConnectionsRouteProvider,
} from "./Datastream/PrivateConnectionsRoute.vibe";
import {
  Stream as DatastreamStream,
  StreamProvider as DatastreamStreamProvider,
} from "./Datastream/Stream.vibe";
import {
  Deployment as DeploymentmanagerDeployment,
  DeploymentProvider as DeploymentmanagerDeploymentProvider,
} from "./DeploymentManager/Deployment.vibe";
import { AccountConnector, AccountConnectorProvider } from "./DeveloperConnect/AccountConnector.ts";
import {
  Connection as DeveloperconnectConnection,
  ConnectionProvider as DeveloperconnectConnectionProvider,
} from "./DeveloperConnect/Connection.ts";
import {
  ConnectionsGitRepositoryLink,
  ConnectionsGitRepositoryLinkProvider,
} from "./DeveloperConnect/ConnectionsGitRepositoryLink.vibe";
import { FetchGitRefsHttp as DeveloperconnectFetchGitRefsHttp } from "./DeveloperConnect/FetchGitRefsHttp.vibe";
import { FetchReadTokenHttp as DeveloperconnectFetchReadTokenHttp } from "./DeveloperConnect/FetchReadTokenHttp.vibe";
import { FetchReadWriteTokenHttp as DeveloperconnectFetchReadWriteTokenHttp } from "./DeveloperConnect/FetchReadWriteTokenHttp.vibe";
import { InsightsConfig, InsightsConfigProvider } from "./DeveloperConnect/InsightsConfig.ts";
import { AgentsEntityType, AgentsEntityTypeProvider } from "./Dialogflow/AgentsEntityType.vibe";
import { AgentsEnvironment, AgentsEnvironmentProvider } from "./Dialogflow/AgentsEnvironment.vibe";
import {
  AgentsEnvironmentsExperiment,
  AgentsEnvironmentsExperimentProvider,
} from "./Dialogflow/AgentsEnvironmentsExperiment.vibe";
import {
  AgentsEnvironmentsSessionsEntityType,
  AgentsEnvironmentsSessionsEntityTypeProvider,
} from "./Dialogflow/AgentsEnvironmentsSessionsEntityType.vibe";
import { AgentsFlow, AgentsFlowProvider } from "./Dialogflow/AgentsFlow.vibe";
import { AgentsFlowsPage, AgentsFlowsPageProvider } from "./Dialogflow/AgentsFlowsPage.vibe";
import {
  AgentsFlowsTransitionRouteGroup,
  AgentsFlowsTransitionRouteGroupProvider,
} from "./Dialogflow/AgentsFlowsTransitionRouteGroup.vibe";
import {
  AgentsFlowsVersion,
  AgentsFlowsVersionProvider,
} from "./Dialogflow/AgentsFlowsVersion.vibe";
import { AgentsGenerator, AgentsGeneratorProvider } from "./Dialogflow/AgentsGenerator.vibe";
import { AgentsIntent, AgentsIntentProvider } from "./Dialogflow/AgentsIntent.vibe";
import { AgentsPlaybook, AgentsPlaybookProvider } from "./Dialogflow/AgentsPlaybook.vibe";
import {
  AgentsPlaybooksExample,
  AgentsPlaybooksExampleProvider,
} from "./Dialogflow/AgentsPlaybooksExample.vibe";
import {
  AgentsPlaybooksVersion,
  AgentsPlaybooksVersionProvider,
} from "./Dialogflow/AgentsPlaybooksVersion.vibe";
import {
  AgentsSessionsEntityType,
  AgentsSessionsEntityTypeProvider,
} from "./Dialogflow/AgentsSessionsEntityType.vibe";
import { AgentsTool, AgentsToolProvider } from "./Dialogflow/AgentsTool.vibe";
import {
  AgentsToolsVersion,
  AgentsToolsVersionProvider,
} from "./Dialogflow/AgentsToolsVersion.vibe";
import {
  AgentsTransitionRouteGroup,
  AgentsTransitionRouteGroupProvider,
} from "./Dialogflow/AgentsTransitionRouteGroup.vibe";
import { AgentsWebhook, AgentsWebhookProvider } from "./Dialogflow/AgentsWebhook.vibe";
import { SecuritySetting, SecuritySettingProvider } from "./Dialogflow/SecuritySetting.vibe";
import {
  CollectionsDataStore,
  CollectionsDataStoreProvider,
} from "./DiscoveryEngine/CollectionsDataStore.ts";
import {
  CollectionsDataStoresBranchesDocument,
  CollectionsDataStoresBranchesDocumentProvider,
} from "./DiscoveryEngine/CollectionsDataStoresBranchesDocument.vibe";
import {
  CollectionsDataStoresControl,
  CollectionsDataStoresControlProvider,
} from "./DiscoveryEngine/CollectionsDataStoresControl.vibe";
import {
  CollectionsDataStoresConversation,
  CollectionsDataStoresConversationProvider,
} from "./DiscoveryEngine/CollectionsDataStoresConversation.vibe";
import {
  CollectionsDataStoresSchema,
  CollectionsDataStoresSchemaProvider,
} from "./DiscoveryEngine/CollectionsDataStoresSchema.ts";
import {
  CollectionsDataStoresServingConfig,
  CollectionsDataStoresServingConfigProvider,
} from "./DiscoveryEngine/CollectionsDataStoresServingConfig.vibe";
import {
  CollectionsDataStoresSession,
  CollectionsDataStoresSessionProvider,
} from "./DiscoveryEngine/CollectionsDataStoresSession.vibe";
import {
  CollectionsDataStoresSiteSearchEngineTargetSite,
  CollectionsDataStoresSiteSearchEngineTargetSiteProvider,
} from "./DiscoveryEngine/CollectionsDataStoresSiteSearchEngineTargetSite.ts";
import {
  CollectionsEngine,
  CollectionsEngineProvider,
} from "./DiscoveryEngine/CollectionsEngine.ts";
import {
  CollectionsEnginesAssistant,
  CollectionsEnginesAssistantProvider,
} from "./DiscoveryEngine/CollectionsEnginesAssistant.vibe";
import {
  CollectionsEnginesAssistantsAgentsA2aV1TasksPushNotificationConfig,
  CollectionsEnginesAssistantsAgentsA2aV1TasksPushNotificationConfigProvider,
} from "./DiscoveryEngine/CollectionsEnginesAssistantsAgentsA2aV1TasksPushNotificationConfig.vibe";
import {
  CollectionsEnginesControl,
  CollectionsEnginesControlProvider,
} from "./DiscoveryEngine/CollectionsEnginesControl.vibe";
import {
  CollectionsEnginesConversation,
  CollectionsEnginesConversationProvider,
} from "./DiscoveryEngine/CollectionsEnginesConversation.vibe";
import {
  CollectionsEnginesServingConfig,
  CollectionsEnginesServingConfigProvider,
} from "./DiscoveryEngine/CollectionsEnginesServingConfig.vibe";
import {
  CollectionsEnginesSession,
  CollectionsEnginesSessionProvider,
} from "./DiscoveryEngine/CollectionsEnginesSession.vibe";
import { DataStore, DataStoreProvider } from "./DiscoveryEngine/DataStore.ts";
import {
  DataStoresBranchesDocument,
  DataStoresBranchesDocumentProvider,
} from "./DiscoveryEngine/DataStoresBranchesDocument.vibe";
import {
  DataStoresControl,
  DataStoresControlProvider,
} from "./DiscoveryEngine/DataStoresControl.vibe";
import {
  DataStoresConversation,
  DataStoresConversationProvider,
} from "./DiscoveryEngine/DataStoresConversation.vibe";
import {
  DataStoresSchema,
  DataStoresSchemaProvider,
} from "./DiscoveryEngine/DataStoresSchema.vibe";
import {
  DataStoresServingConfig,
  DataStoresServingConfigProvider,
} from "./DiscoveryEngine/DataStoresServingConfig.vibe";
import {
  DataStoresSession,
  DataStoresSessionProvider,
} from "./DiscoveryEngine/DataStoresSession.vibe";
import {
  DataStoresSiteSearchEngineTargetSite,
  DataStoresSiteSearchEngineTargetSiteProvider,
} from "./DiscoveryEngine/DataStoresSiteSearchEngineTargetSite.vibe";
import {
  IdentityMappingStore,
  IdentityMappingStoreProvider,
} from "./DiscoveryEngine/IdentityMappingStore.vibe";
import { ContentPolicy, ContentPolicyProvider } from "./DLP/ContentPolicy.vibe";
import { DeidentifyTemplate, DeidentifyTemplateProvider } from "./DLP/DeidentifyTemplate.vibe";
import { DiscoveryConfig, DiscoveryConfigProvider } from "./DLP/DiscoveryConfig.vibe";
import { DlpJob, DlpJobProvider } from "./DLP/DlpJob.ts";
import { InspectTemplate, InspectTemplateProvider } from "./DLP/InspectTemplate.vibe";
import { JobTrigger, JobTriggerProvider } from "./DLP/JobTrigger.vibe";
import {
  LocationsDeidentifyTemplate,
  LocationsDeidentifyTemplateProvider,
} from "./DLP/LocationsDeidentifyTemplate.vibe";
import { LocationsDlpJob, LocationsDlpJobProvider } from "./DLP/LocationsDlpJob.vibe";
import {
  LocationsInspectTemplate,
  LocationsInspectTemplateProvider,
} from "./DLP/LocationsInspectTemplate.vibe";
import { LocationsJobTrigger, LocationsJobTriggerProvider } from "./DLP/LocationsJobTrigger.vibe";
import {
  LocationsStoredInfoType,
  LocationsStoredInfoTypeProvider,
} from "./DLP/LocationsStoredInfoType.vibe";
import {
  OrganizationsDeidentifyTemplate,
  OrganizationsDeidentifyTemplateProvider,
} from "./DLP/OrganizationsDeidentifyTemplate.vibe";
import {
  OrganizationsInspectTemplate,
  OrganizationsInspectTemplateProvider,
} from "./DLP/OrganizationsInspectTemplate.vibe";
import {
  OrganizationsLocationsConnection,
  OrganizationsLocationsConnectionProvider,
} from "./DLP/OrganizationsLocationsConnection.vibe";
import {
  OrganizationsLocationsDeidentifyTemplate,
  OrganizationsLocationsDeidentifyTemplateProvider,
} from "./DLP/OrganizationsLocationsDeidentifyTemplate.vibe";
import {
  OrganizationsLocationsDiscoveryConfig,
  OrganizationsLocationsDiscoveryConfigProvider,
} from "./DLP/OrganizationsLocationsDiscoveryConfig.vibe";
import {
  OrganizationsLocationsInspectTemplate,
  OrganizationsLocationsInspectTemplateProvider,
} from "./DLP/OrganizationsLocationsInspectTemplate.vibe";
import {
  OrganizationsLocationsJobTrigger,
  OrganizationsLocationsJobTriggerProvider,
} from "./DLP/OrganizationsLocationsJobTrigger.vibe";
import {
  OrganizationsLocationsStoredInfoType,
  OrganizationsLocationsStoredInfoTypeProvider,
} from "./DLP/OrganizationsLocationsStoredInfoType.vibe";
import {
  OrganizationStoredInfoType,
  OrganizationStoredInfoTypeProvider,
} from "./DLP/OrganizationStoredInfoType.vibe";
import { StoredInfoType, StoredInfoTypeProvider } from "./DLP/StoredInfoType.vibe";
import { ManagedZone, ManagedZoneProvider } from "./DNS/ManagedZone.vibe";
import { Policy as DnsPolicy, PolicyProvider as DnsPolicyProvider } from "./DNS/Policy.vibe";
import { ResourceRecordSet, ResourceRecordSetProvider } from "./DNS/ResourceRecordSet.vibe";
import { ResponsePolicy, ResponsePolicyProvider } from "./DNS/ResponsePolicy.vibe";
import { ResponsePolicyRule, ResponsePolicyRuleProvider } from "./DNS/ResponsePolicyRule.vibe";
import { GetProcessorHttp } from "./DocumentAI/GetProcessorHttp.vibe";
import { GetSchemaHttp as DocumentaiGetSchemaHttp } from "./DocumentAI/GetSchemaHttp.vibe";
import { GetSchemaVersionHttp } from "./DocumentAI/GetSchemaVersionHttp.vibe";
import { ProcessHttp as DocumentaiProcessHttp } from "./DocumentAI/ProcessHttp.vibe";
import {
  Processor as DocumentaiProcessor,
  ProcessorProvider as DocumentaiProcessorProvider,
} from "./DocumentAI/Processor.vibe";
import {
  Schema as DocumentaiSchema,
  SchemaProvider as DocumentaiSchemaProvider,
} from "./DocumentAI/Schema.vibe";
import {
  SchemasSchemaVersion,
  SchemasSchemaVersionProvider,
} from "./DocumentAI/SchemasSchemaVersion.vibe";
import { fromCredentials } from "./Environment.ts";
import {
  Contact as EssentialcontactsContact,
  ContactProvider as EssentialcontactsContactProvider,
} from "./EssentialContacts/Contact.vibe";
import { FolderContact, FolderContactProvider } from "./EssentialContacts/FolderContact.vibe";
import {
  OrganizationContact,
  OrganizationContactProvider,
} from "./EssentialContacts/OrganizationContact.vibe";
import { Channel, ChannelProvider } from "./Eventarc/Channel.ts";
import { ChannelConnection, ChannelConnectionProvider } from "./Eventarc/ChannelConnection.ts";
import { Enrollment, EnrollmentProvider } from "./Eventarc/Enrollment.ts";
import { GoogleApiSource, GoogleApiSourceProvider } from "./Eventarc/GoogleApiSource.ts";
import { MessageBus, MessageBusProvider } from "./Eventarc/MessageBus.ts";
import { Pipeline, PipelineProvider } from "./Eventarc/Pipeline.ts";
import { Trigger, TriggerProvider } from "./Eventarc/Trigger.ts";
import {
  Backup as FilestoreBackup,
  BackupProvider as FilestoreBackupProvider,
} from "./Filestore/Backup.vibe";
import { GetBackupHttp as GetFilestoreBackupHttp } from "./Filestore/GetBackupHttp.vibe";
import { GetInstanceHttp as GetFilestoreInstanceHttp } from "./Filestore/GetInstanceHttp.vibe";
import { GetInstancesSnapshotHttp as GetFilestoreInstancesSnapshotHttp } from "./Filestore/GetInstancesSnapshotHttp.vibe";
import {
  Instance as FilestoreInstance,
  InstanceProvider as FilestoreInstanceProvider,
} from "./Filestore/Instance.ts";
import {
  InstancesSnapshot as FilestoreInstancesSnapshot,
  InstancesSnapshotProvider as FilestoreInstancesSnapshotProvider,
} from "./Filestore/InstancesSnapshot.vibe";
import { AndroidApp, AndroidAppProvider } from "./Firebase/AndroidApp.vibe";
import { AppsDebugToken, AppsDebugTokenProvider } from "./FirebaseAppCheck/AppsDebugToken.vibe";
import { ExchangeDebugTokenHttp } from "./FirebaseAppCheck/ExchangeDebugTokenHttp.vibe";
import {
  ServicesResourcePolicy,
  ServicesResourcePolicyProvider,
} from "./FirebaseAppCheck/ServicesResourcePolicy.vibe";
import {
  Group as FirebaseappdistributionGroup,
  GroupProvider as FirebaseappdistributionGroupProvider,
} from "./FirebaseAppDistribution/Group.vibe";
import {
  Backend as FirebaseapphostingBackend,
  BackendProvider as FirebaseapphostingBackendProvider,
} from "./FirebaseAppHosting/Backend.vibe";
import { BackendsBuild, BackendsBuildProvider } from "./FirebaseAppHosting/BackendsBuild.vibe";
import { BackendsDomain, BackendsDomainProvider } from "./FirebaseAppHosting/BackendsDomain.vibe";
import { ExecuteGraphqlHttp } from "./FirebaseDataConnect/ExecuteGraphqlHttp.vibe";
import { ExecuteGraphqlReadHttp } from "./FirebaseDataConnect/ExecuteGraphqlReadHttp.vibe";
import { ExecuteMutationHttp } from "./FirebaseDataConnect/ExecuteMutationHttp.vibe";
import { ExecuteQueryHttp } from "./FirebaseDataConnect/ExecuteQueryHttp.vibe";
import {
  Service as FirebasedataconnectService,
  ServiceProvider as FirebasedataconnectServiceProvider,
} from "./FirebaseDataConnect/Service.vibe";
import {
  ServicesConnector,
  ServicesConnectorProvider,
} from "./FirebaseDataConnect/ServicesConnector.vibe";
import { ServicesSchema, ServicesSchemaProvider } from "./FirebaseDataConnect/ServicesSchema.vibe";
import { GetReleaseExecutableHttp } from "./FirebaseRules/GetReleaseExecutableHttp.vibe";
import {
  Release as FirebaserulesRelease,
  ReleaseProvider as FirebaserulesReleaseProvider,
} from "./FirebaseRules/Release.vibe";
import {
  Ruleset as FirebaserulesRuleset,
  RulesetProvider as FirebaserulesRulesetProvider,
} from "./FirebaseRules/Ruleset.vibe";
import { TestRulesetHttp } from "./FirebaseRules/TestRulesetHttp.vibe";
import { Database, DatabaseProvider } from "./Firestore/Database.vibe";
import {
  DatabasesBackupSchedule,
  DatabasesBackupScheduleProvider,
} from "./Firestore/DatabasesBackupSchedule.vibe";
import {
  DatabasesCollectionGroupsIndex,
  DatabasesCollectionGroupsIndexProvider,
} from "./Firestore/DatabasesCollectionGroupsIndex.vibe";
import { DatabasesUserCred, DatabasesUserCredProvider } from "./Firestore/DatabasesUserCred.vibe";
import { DeleteDocumentHttp } from "./Firestore/DeleteDocumentHttp.vibe";
import { GetDocumentHttp } from "./Firestore/GetDocumentHttp.vibe";
import { PatchDocumentHttp } from "./Firestore/PatchDocumentHttp.vibe";
import {
  AchievementConfiguration,
  AchievementConfigurationProvider,
} from "./GamesConfiguration/AchievementConfiguration.vibe";
import {
  LeaderboardConfiguration,
  LeaderboardConfigurationProvider,
} from "./GamesConfiguration/LeaderboardConfiguration.vibe";
import { BackupChannel, BackupChannelProvider } from "./GKEBackup/BackupChannel.vibe";
import { BackupPlan, BackupPlanProvider } from "./GKEBackup/BackupPlan.vibe";
import { BackupPlansBackup, BackupPlansBackupProvider } from "./GKEBackup/BackupPlansBackup.vibe";
import { RestoreChannel, RestoreChannelProvider } from "./GKEBackup/RestoreChannel.vibe";
import { RestorePlan, RestorePlanProvider } from "./GKEBackup/RestorePlan.vibe";
import {
  RestorePlansRestore,
  RestorePlansRestoreProvider,
} from "./GKEBackup/RestorePlansRestore.vibe";
import { MembershipsFeature, MembershipsFeatureProvider } from "./GKEHub/MembershipsFeature.vibe";
import { BareMetalCluster, BareMetalClusterProvider } from "./GKEOnPrem/BareMetalCluster.vibe";
import {
  BareMetalClustersBareMetalNodePool,
  BareMetalClustersBareMetalNodePoolProvider,
} from "./GKEOnPrem/BareMetalClustersBareMetalNodePool.vibe";
import {
  VmwareCluster as GkeonpremVmwareCluster,
  VmwareClusterProvider as GkeonpremVmwareClusterProvider,
} from "./GKEOnPrem/VmwareCluster.vibe";
import {
  VmwareClustersVmwareNodePool,
  VmwareClustersVmwareNodePoolProvider,
} from "./GKEOnPrem/VmwareClustersVmwareNodePool.vibe";
import {
  Domain as GmailpostmastertoolsDomain,
  DomainProvider as GmailpostmastertoolsDomainProvider,
} from "./GmailPostmasterTools/Domain.vibe";
import { DomainsUser, DomainsUserProvider } from "./GmailPostmasterTools/DomainsUser.vibe";
import {
  Dataset as HealthcareDataset,
  DatasetProvider as HealthcareDatasetProvider,
} from "./Healthcare/Dataset.vibe";
import {
  DatasetsConsentStore,
  DatasetsConsentStoreProvider,
} from "./Healthcare/DatasetsConsentStore.vibe";
import {
  DatasetsConsentStoresAttributeDefinition,
  DatasetsConsentStoresAttributeDefinitionProvider,
} from "./Healthcare/DatasetsConsentStoresAttributeDefinition.vibe";
import {
  DatasetsConsentStoresConsent,
  DatasetsConsentStoresConsentProvider,
} from "./Healthcare/DatasetsConsentStoresConsent.vibe";
import {
  DatasetsConsentStoresConsentArtifact,
  DatasetsConsentStoresConsentArtifactProvider,
} from "./Healthcare/DatasetsConsentStoresConsentArtifact.vibe";
import {
  DatasetsConsentStoresUserDataMapping,
  DatasetsConsentStoresUserDataMappingProvider,
} from "./Healthcare/DatasetsConsentStoresUserDataMapping.vibe";
import {
  DatasetsDicomStore,
  DatasetsDicomStoreProvider,
} from "./Healthcare/DatasetsDicomStore.vibe";
import { DatasetsFhirStore, DatasetsFhirStoreProvider } from "./Healthcare/DatasetsFhirStore.vibe";
import {
  DatasetsHl7V2Store,
  DatasetsHl7V2StoreProvider,
} from "./Healthcare/DatasetsHl7V2Store.vibe";
import {
  DatasetsHl7V2StoresMessage,
  DatasetsHl7V2StoresMessageProvider,
} from "./Healthcare/DatasetsHl7V2StoresMessage.vibe";
import { HostServiceAccount, HostServiceAccountProvider } from "./IAM/HostServiceAccount.vibe";
import { Member as IamMember, MemberProvider as IamMemberProvider } from "./IAM/Member.vibe";
import { Policy as IamPolicy, PolicyProvider as IamPolicyProvider } from "./IAM/Policy.vibe";
import {
  ServiceAccount as IamServiceAccount,
  ServiceAccountProvider as IamServiceAccountProvider,
} from "./IAM/ServiceAccount.ts";
import {
  ServiceAccountKey as IamServiceAccountKey,
  ServiceAccountKeyProvider as IamServiceAccountKeyProvider,
} from "./IAM/ServiceAccountKey.vibe";
import {
  WorkloadIdentityPool,
  WorkloadIdentityPoolProvider,
} from "./IAM/WorkloadIdentityPool.vibe";
import {
  WorkloadIdentityProvider,
  WorkloadIdentityProviderProvider,
} from "./IAM/WorkloadIdentityProvider.vibe";
import {
  BrandsIdentityAwareProxyClient,
  BrandsIdentityAwareProxyClientProvider,
} from "./IAP/BrandsIdentityAwareProxyClient.vibe";
import { IapDestGroup, IapDestGroupProvider } from "./IAP/IapDestGroup.vibe";
import { AuthConfig, AuthConfigProvider } from "./Integrations/AuthConfig.vibe";
import {
  IntegrationsVersion,
  IntegrationsVersionProvider,
} from "./Integrations/IntegrationsVersion.vibe";
import {
  IntegrationsVersionsTestCases,
  IntegrationsVersionsTestCasesProvider,
} from "./Integrations/IntegrationsVersionsTestCases.vibe";
import {
  ProductsAuthConfig,
  ProductsAuthConfigProvider,
} from "./Integrations/ProductsAuthConfig.vibe";
import {
  ProductsCertificate,
  ProductsCertificateProvider,
} from "./Integrations/ProductsCertificate.vibe";
import {
  ProductsIntegrationsVersion,
  ProductsIntegrationsVersionProvider,
} from "./Integrations/ProductsIntegrationsVersion.vibe";
import {
  ProductsSfdcInstance,
  ProductsSfdcInstanceProvider,
} from "./Integrations/ProductsSfdcInstance.vibe";
import {
  ProductsSfdcInstancesSfdcChannel,
  ProductsSfdcInstancesSfdcChannelProvider,
} from "./Integrations/ProductsSfdcInstancesSfdcChannel.vibe";
import { SfdcInstance, SfdcInstanceProvider } from "./Integrations/SfdcInstance.vibe";
import {
  SfdcInstancesSfdcChannel,
  SfdcInstancesSfdcChannelProvider,
} from "./Integrations/SfdcInstancesSfdcChannel.vibe";
import {
  Template as IntegrationsTemplate,
  TemplateProvider as IntegrationsTemplateProvider,
} from "./Integrations/Template.vibe";
import { Tenant as JobsTenant, TenantProvider as JobsTenantProvider } from "./Jobs/Tenant.vibe";
import { TenantsCompany, TenantsCompanyProvider } from "./Jobs/TenantsCompany.vibe";
import { TenantsJob, TenantsJobProvider } from "./Jobs/TenantsJob.vibe";
import { CryptoKey, CryptoKeyProvider } from "./KMS/CryptoKey.ts";
import { CryptoKeyVersion, CryptoKeyVersionProvider } from "./KMS/CryptoKeyVersion.vibe";
import { DecryptHttp } from "./KMS/DecryptHttp.vibe";
import { EncryptHttp } from "./KMS/EncryptHttp.vibe";
import { ImportJob, ImportJobProvider } from "./KMS/ImportJob.vibe";
import { KeyRing, KeyRingProvider } from "./KMS/KeyRing.vibe";
import {
  SingleTenantHsmInstanceProposal,
  SingleTenantHsmInstanceProposalProvider,
} from "./KMS/SingleTenantHsmInstanceProposal.vibe";
import { LicenseAssignment, LicenseAssignmentProvider } from "./Licensing/LicenseAssignment.vibe";
import { BillingBucket, BillingBucketProvider } from "./Logging/BillingBucket.ts";
import { BillingBucketsLink, BillingBucketsLinkProvider } from "./Logging/BillingBucketsLink.ts";
import { BillingBucketsView, BillingBucketsViewProvider } from "./Logging/BillingBucketsView.vibe";
import { BillingExclusion, BillingExclusionProvider } from "./Logging/BillingExclusion.vibe";
import { BillingSavedQuery, BillingSavedQueryProvider } from "./Logging/BillingSavedQuery.vibe";
import { BillingSink, BillingSinkProvider } from "./Logging/BillingSink.vibe";
import { BucketsLink, BucketsLinkProvider } from "./Logging/BucketsLink.ts";
import { BucketsView, BucketsViewProvider } from "./Logging/BucketsView.vibe";
import { Exclusion, ExclusionProvider } from "./Logging/Exclusion.vibe";
import { FolderBucket, FolderBucketProvider } from "./Logging/FolderBucket.ts";
import { FolderBucketsLink, FolderBucketsLinkProvider } from "./Logging/FolderBucketsLink.ts";
import { FolderBucketsView, FolderBucketsViewProvider } from "./Logging/FolderBucketsView.vibe";
import { FolderExclusion, FolderExclusionProvider } from "./Logging/FolderExclusion.vibe";
import { FolderLogScope, FolderLogScopeProvider } from "./Logging/FolderLogScope.vibe";
import { FolderSavedQuery, FolderSavedQueryProvider } from "./Logging/FolderSavedQuery.vibe";
import { FolderSink, FolderSinkProvider } from "./Logging/FolderSink.vibe";
import { LocationsBucket, LocationsBucketProvider } from "./Logging/LocationsBucket.ts";
import {
  LocationsBucketsLink,
  LocationsBucketsLinkProvider,
} from "./Logging/LocationsBucketsLink.ts";
import {
  LocationsBucketsView,
  LocationsBucketsViewProvider,
} from "./Logging/LocationsBucketsView.vibe";
import { LogBucket, LogBucketProvider } from "./Logging/LogBucket.ts";
import { LogScope, LogScopeProvider } from "./Logging/LogScope.vibe";
import { Metric, MetricProvider } from "./Logging/Metric.vibe";
import {
  OrganizationBucketsLink,
  OrganizationBucketsLinkProvider,
} from "./Logging/OrganizationBucketsLink.ts";
import {
  OrganizationBucketsView,
  OrganizationBucketsViewProvider,
} from "./Logging/OrganizationBucketsView.vibe";
import {
  OrganizationExclusion,
  OrganizationExclusionProvider,
} from "./Logging/OrganizationExclusion.vibe";
import {
  OrganizationLogBucket,
  OrganizationLogBucketProvider,
} from "./Logging/OrganizationLogBucket.ts";
import {
  OrganizationLogScope,
  OrganizationLogScopeProvider,
} from "./Logging/OrganizationLogScope.vibe";
import {
  OrganizationSavedQuery,
  OrganizationSavedQueryProvider,
} from "./Logging/OrganizationSavedQuery.vibe";
import { OrganizationSink, OrganizationSinkProvider } from "./Logging/OrganizationSink.vibe";
import { SavedQuery, SavedQueryProvider } from "./Logging/SavedQuery.vibe";
import { Sink, SinkProvider } from "./Logging/Sink.vibe";
import { InstancesBackup, InstancesBackupProvider } from "./Looker/InstancesBackup.ts";
import {
  Domain as ManagedidentitiesDomain,
  DomainProvider as ManagedidentitiesDomainProvider,
} from "./ManagedIdentities/Domain.vibe";
import {
  DomainsBackup as ManagedidentitiesDomainsBackup,
  DomainsBackupProvider as ManagedidentitiesDomainsBackupProvider,
} from "./ManagedIdentities/DomainsBackup.vibe";
import {
  Peering as ManagedidentitiesPeering,
  PeeringProvider as ManagedidentitiesPeeringProvider,
} from "./ManagedIdentities/Peering.vibe";
import {
  Cluster as ManagedKafkaCluster,
  ClusterProvider as ManagedKafkaClusterProvider,
} from "./ManagedKafka/Cluster.vibe";
import { ClustersAcl, ClustersAclProvider } from "./ManagedKafka/ClustersAcl.vibe";
import { ClustersTopic, ClustersTopicProvider } from "./ManagedKafka/ClustersTopic.vibe";
import {
  ConnectCluster as ManagedKafkaConnectCluster,
  ConnectClusterProvider as ManagedKafkaConnectClusterProvider,
} from "./ManagedKafka/ConnectCluster.vibe";
import {
  ConnectClustersConnector,
  ConnectClustersConnectorProvider,
} from "./ManagedKafka/ConnectClustersConnector.vibe";
import { GetClusterHttp as GetManagedKafkaClusterHttp } from "./ManagedKafka/GetClusterHttp.vibe";
import { GetConnectClusterHttp as GetManagedKafkaConnectClusterHttp } from "./ManagedKafka/GetConnectClusterHttp.vibe";
import { GetSchemaRegistryHttp as GetManagedKafkaSchemaRegistryHttp } from "./ManagedKafka/GetSchemaRegistryHttp.vibe";
import { GetTopicHttp as GetManagedKafkaTopicHttp } from "./ManagedKafka/GetTopicHttp.vibe";
import {
  SchemaRegistriesContextsSubjectsVersion,
  SchemaRegistriesContextsSubjectsVersionProvider,
} from "./ManagedKafka/SchemaRegistriesContextsSubjectsVersion.vibe";
import {
  SchemaRegistriesSubjectsVersion,
  SchemaRegistriesSubjectsVersionProvider,
} from "./ManagedKafka/SchemaRegistriesSubjectsVersion.vibe";
import {
  SchemaRegistry as ManagedKafkaSchemaRegistry,
  SchemaRegistryProvider as ManagedKafkaSchemaRegistryProvider,
} from "./ManagedKafka/SchemaRegistry.vibe";
import { GetInstanceHttp as GetMemcacheInstanceHttp } from "./Memcache/GetInstanceHttp.vibe";
import {
  Instance as MemcacheInstance,
  InstanceProvider as MemcacheInstanceProvider,
} from "./Memcache/Instance.ts";
import { MerchantReview, MerchantReviewProvider } from "./MerchantApiReviews/MerchantReview.vibe";
import { ProductReview, ProductReviewProvider } from "./MerchantApiReviews/ProductReview.vibe";
import {
  Federation as MetastoreFederation,
  FederationProvider as MetastoreFederationProvider,
} from "./Metastore/Federation.vibe";
import {
  Service as MetastoreService,
  ServiceProvider as MetastoreServiceProvider,
} from "./Metastore/Service.vibe";
import {
  ServicesBackup as MetastoreServicesBackup,
  ServicesBackupProvider as MetastoreServicesBackupProvider,
} from "./Metastore/ServicesBackup.vibe";
import {
  AssetsExportJob as MigrationcenterAssetsExportJob,
  AssetsExportJobProvider as MigrationcenterAssetsExportJobProvider,
} from "./MigrationCenter/AssetsExportJob.vibe";
import {
  DiscoveryClient as MigrationcenterDiscoveryClient,
  DiscoveryClientProvider as MigrationcenterDiscoveryClientProvider,
} from "./MigrationCenter/DiscoveryClient.vibe";
import {
  Group as MigrationcenterGroup,
  GroupProvider as MigrationcenterGroupProvider,
} from "./MigrationCenter/Group.vibe";
import {
  ImportJob as MigrationcenterImportJob,
  ImportJobProvider as MigrationcenterImportJobProvider,
} from "./MigrationCenter/ImportJob.vibe";
import {
  ImportJobsImportDataFile as MigrationcenterImportJobsImportDataFile,
  ImportJobsImportDataFileProvider as MigrationcenterImportJobsImportDataFileProvider,
} from "./MigrationCenter/ImportJobsImportDataFile.vibe";
import {
  PreferenceSet as MigrationcenterPreferenceSet,
  PreferenceSetProvider as MigrationcenterPreferenceSetProvider,
} from "./MigrationCenter/PreferenceSet.vibe";
import {
  ReportConfig as MigrationcenterReportConfig,
  ReportConfigProvider as MigrationcenterReportConfigProvider,
} from "./MigrationCenter/ReportConfig.vibe";
import {
  ReportConfigsReport as MigrationcenterReportConfigsReport,
  ReportConfigsReportProvider as MigrationcenterReportConfigsReportProvider,
} from "./MigrationCenter/ReportConfigsReport.vibe";
import {
  Source as MigrationcenterSource,
  SourceProvider as MigrationcenterSourceProvider,
} from "./MigrationCenter/Source.vibe";
import { GetModelHttp as GetMlModelHttp } from "./ML/GetModelHttp.vibe";
import { GetVersionHttp as GetMlVersionHttp } from "./ML/GetVersionHttp.vibe";
import { Model as MlModel, ModelProvider as MlModelProvider } from "./ML/Model.vibe";
import { ModelsVersion, ModelsVersionProvider } from "./ML/ModelsVersion.vibe";
import { PredictHttp as PredictMlHttp } from "./ML/PredictHttp.vibe";
import { AlertPolicy, AlertPolicyProvider } from "./Monitoring/AlertPolicy.vibe";
import {
  Group as MonitoringGroup,
  GroupProvider as MonitoringGroupProvider,
} from "./Monitoring/Group.vibe";
import { MetricDescriptor, MetricDescriptorProvider } from "./Monitoring/MetricDescriptor.vibe";
import {
  NotificationChannel,
  NotificationChannelProvider,
} from "./Monitoring/NotificationChannel.vibe";
import {
  Service as MonitoringService,
  ServiceProvider as MonitoringServiceProvider,
} from "./Monitoring/Service.vibe";
import {
  ServicesServiceLevelObjective,
  ServicesServiceLevelObjectiveProvider,
} from "./Monitoring/ServicesServiceLevelObjective.vibe";
import { UptimeCheckConfig, UptimeCheckConfigProvider } from "./Monitoring/UptimeCheckConfig.vibe";
import {
  ActiveDirectory as NetappActiveDirectory,
  ActiveDirectoryProvider as NetappActiveDirectoryProvider,
} from "./NetApp/ActiveDirectory.vibe";
import {
  BackupPolicy as NetappBackupPolicy,
  BackupPolicyProvider as NetappBackupPolicyProvider,
} from "./NetApp/BackupPolicy.vibe";
import {
  BackupVault as NetappBackupVault,
  BackupVaultProvider as NetappBackupVaultProvider,
} from "./NetApp/BackupVault.vibe";
import {
  BackupVaultsBackup as NetappBackupVaultsBackup,
  BackupVaultsBackupProvider as NetappBackupVaultsBackupProvider,
} from "./NetApp/BackupVaultsBackup.vibe";
import {
  HostGroup as NetappHostGroup,
  HostGroupProvider as NetappHostGroupProvider,
} from "./NetApp/HostGroup.vibe";
import {
  KmsConfig as NetappKmsConfig,
  KmsConfigProvider as NetappKmsConfigProvider,
} from "./NetApp/KmsConfig.vibe";
import {
  StoragePool as NetappStoragePool,
  StoragePoolProvider as NetappStoragePoolProvider,
} from "./NetApp/StoragePool.vibe";
import {
  Volume as NetappVolume,
  VolumeProvider as NetappVolumeProvider,
} from "./NetApp/Volume.vibe";
import {
  VolumesQuotaRule as NetappVolumesQuotaRule,
  VolumesQuotaRuleProvider as NetappVolumesQuotaRuleProvider,
} from "./NetApp/VolumesQuotaRule.vibe";
import { VolumesReplication, VolumesReplicationProvider } from "./NetApp/VolumesReplication.ts";
import { VolumesSnapshot, VolumesSnapshotProvider } from "./NetApp/VolumesSnapshot.vibe";
import {
  AutomatedDnsRecord,
  AutomatedDnsRecordProvider,
} from "./NetworkConnectivity/AutomatedDnsRecord.vibe";
import { Hub, HubProvider } from "./NetworkConnectivity/Hub.ts";
import { InternalRange, InternalRangeProvider } from "./NetworkConnectivity/InternalRange.ts";
import {
  MulticloudDataTransferConfig,
  MulticloudDataTransferConfigProvider,
} from "./NetworkConnectivity/MulticloudDataTransferConfig.vibe";
import {
  MulticloudDataTransferConfigsDestination,
  MulticloudDataTransferConfigsDestinationProvider,
} from "./NetworkConnectivity/MulticloudDataTransferConfigsDestination.vibe";
import {
  PolicyBasedRoute,
  PolicyBasedRouteProvider,
} from "./NetworkConnectivity/PolicyBasedRoute.ts";
import {
  RegionalEndpoint,
  RegionalEndpointProvider,
} from "./NetworkConnectivity/RegionalEndpoint.vibe";
import {
  ServiceConnectionMap,
  ServiceConnectionMapProvider,
} from "./NetworkConnectivity/ServiceConnectionMap.vibe";
import {
  ServiceConnectionPolicy,
  ServiceConnectionPolicyProvider,
} from "./NetworkConnectivity/ServiceConnectionPolicy.vibe";
import {
  ServiceConnectionToken,
  ServiceConnectionTokenProvider,
} from "./NetworkConnectivity/ServiceConnectionToken.vibe";
import { Spoke, SpokeProvider } from "./NetworkConnectivity/Spoke.ts";
import {
  SpokesGatewayAdvertisedRoute,
  SpokesGatewayAdvertisedRouteProvider,
} from "./NetworkConnectivity/SpokesGatewayAdvertisedRoute.vibe";
import { Transport, TransportProvider } from "./NetworkConnectivity/Transport.ts";
import {
  ConnectivityTest,
  ConnectivityTestProvider,
} from "./NetworkManagement/ConnectivityTest.vibe";
import {
  NetworkMonitoringProvider,
  NetworkMonitoringProviderProvider,
} from "./NetworkManagement/NetworkMonitoringProvider.vibe";
import {
  OrganizationsVpcFlowLogsConfig,
  OrganizationsVpcFlowLogsConfigProvider,
} from "./NetworkManagement/OrganizationsVpcFlowLogsConfig.vibe";
import {
  VpcFlowLogsConfig,
  VpcFlowLogsConfigProvider,
} from "./NetworkManagement/VpcFlowLogsConfig.vibe";
import { AddressGroup, AddressGroupProvider } from "./NetworkSecurity/AddressGroup.vibe";
import {
  AuthorizationPolicy,
  AuthorizationPolicyProvider,
} from "./NetworkSecurity/AuthorizationPolicy.vibe";
import { AuthzPolicy, AuthzPolicyProvider } from "./NetworkSecurity/AuthzPolicy.vibe";
import {
  BackendAuthenticationConfig,
  BackendAuthenticationConfigProvider,
} from "./NetworkSecurity/BackendAuthenticationConfig.vibe";
import { ClientTlsPolicy, ClientTlsPolicyProvider } from "./NetworkSecurity/ClientTlsPolicy.vibe";
import {
  DnsThreatDetector,
  DnsThreatDetectorProvider,
} from "./NetworkSecurity/DnsThreatDetector.vibe";
import {
  FirewallEndpoint,
  FirewallEndpointProvider,
} from "./NetworkSecurity/FirewallEndpoint.vibe";
import {
  FirewallEndpointAssociation,
  FirewallEndpointAssociationProvider,
} from "./NetworkSecurity/FirewallEndpointAssociation.vibe";
import {
  GatewaySecurityPoliciesRule,
  GatewaySecurityPoliciesRuleProvider,
} from "./NetworkSecurity/GatewaySecurityPoliciesRule.vibe";
import {
  GatewaySecurityPolicy,
  GatewaySecurityPolicyProvider,
} from "./NetworkSecurity/GatewaySecurityPolicy.vibe";
import {
  InterceptDeployment,
  InterceptDeploymentProvider,
} from "./NetworkSecurity/InterceptDeployment.vibe";
import {
  InterceptDeploymentGroup,
  InterceptDeploymentGroupProvider,
} from "./NetworkSecurity/InterceptDeploymentGroup.vibe";
import {
  InterceptEndpointGroup,
  InterceptEndpointGroupProvider,
} from "./NetworkSecurity/InterceptEndpointGroup.ts";
import {
  InterceptEndpointGroupAssociation,
  InterceptEndpointGroupAssociationProvider,
} from "./NetworkSecurity/InterceptEndpointGroupAssociation.ts";
import {
  MirroringDeployment,
  MirroringDeploymentProvider,
} from "./NetworkSecurity/MirroringDeployment.ts";
import {
  MirroringDeploymentGroup,
  MirroringDeploymentGroupProvider,
} from "./NetworkSecurity/MirroringDeploymentGroup.ts";
import {
  MirroringEndpointGroup,
  MirroringEndpointGroupProvider,
} from "./NetworkSecurity/MirroringEndpointGroup.ts";
import {
  MirroringEndpointGroupAssociation,
  MirroringEndpointGroupAssociationProvider,
} from "./NetworkSecurity/MirroringEndpointGroupAssociation.ts";
import {
  OrganizationsAddressGroup,
  OrganizationsAddressGroupProvider,
} from "./NetworkSecurity/OrganizationsAddressGroup.vibe";
import {
  OrganizationsFirewallEndpoint,
  OrganizationsFirewallEndpointProvider,
} from "./NetworkSecurity/OrganizationsFirewallEndpoint.vibe";
import {
  OrganizationsSecurityProfile,
  OrganizationsSecurityProfileProvider,
} from "./NetworkSecurity/OrganizationsSecurityProfile.vibe";
import {
  OrganizationsSecurityProfileGroup,
  OrganizationsSecurityProfileGroupProvider,
} from "./NetworkSecurity/OrganizationsSecurityProfileGroup.vibe";
import { SacAttachment, SacAttachmentProvider } from "./NetworkSecurity/SacAttachment.ts";
import { SacRealm, SacRealmProvider } from "./NetworkSecurity/SacRealm.ts";
import { SecurityProfile, SecurityProfileProvider } from "./NetworkSecurity/SecurityProfile.ts";
import {
  SecurityProfileGroup,
  SecurityProfileGroupProvider,
} from "./NetworkSecurity/SecurityProfileGroup.ts";
import { ServerTlsPolicy, ServerTlsPolicyProvider } from "./NetworkSecurity/ServerTlsPolicy.ts";
import {
  TlsInspectionPolicy,
  TlsInspectionPolicyProvider,
} from "./NetworkSecurity/TlsInspectionPolicy.ts";
import { UrlList, UrlListProvider } from "./NetworkSecurity/UrlList.ts";
import { AgentGateway, AgentGatewayProvider } from "./NetworkServices/AgentGateway.vibe";
import { AuthzExtension, AuthzExtensionProvider } from "./NetworkServices/AuthzExtension.vibe";
import { EndpointPolicy, EndpointPolicyProvider } from "./NetworkServices/EndpointPolicy.vibe";
import {
  Gateway as NetworkservicesGateway,
  GatewayProvider as NetworkservicesGatewayProvider,
} from "./NetworkServices/Gateway.vibe";
import { GrpcRoute, GrpcRouteProvider } from "./NetworkServices/GrpcRoute.vibe";
import { HttpRoute, HttpRouteProvider } from "./NetworkServices/HttpRoute.vibe";
import { LbEdgeExtension, LbEdgeExtensionProvider } from "./NetworkServices/LbEdgeExtension.vibe";
import {
  LbRouteExtension,
  LbRouteExtensionProvider,
} from "./NetworkServices/LbRouteExtension.vibe";
import {
  LbTrafficExtension,
  LbTrafficExtensionProvider,
} from "./NetworkServices/LbTrafficExtension.vibe";
import { Mesh, MeshProvider } from "./NetworkServices/Mesh.vibe";
import {
  MulticastConsumerAssociation,
  MulticastConsumerAssociationProvider,
} from "./NetworkServices/MulticastConsumerAssociation.vibe";
import {
  MulticastGroupConsumerActivation,
  MulticastGroupConsumerActivationProvider,
} from "./NetworkServices/MulticastGroupConsumerActivation.vibe";
import { ServiceBinding, ServiceBindingProvider } from "./NetworkServices/ServiceBinding.vibe";
import { ServiceLbPolicy, ServiceLbPolicyProvider } from "./NetworkServices/ServiceLbPolicy.vibe";
import { TcpRoute, TcpRouteProvider } from "./NetworkServices/TcpRoute.vibe";
import { TlsRoute, TlsRouteProvider } from "./NetworkServices/TlsRoute.vibe";
import { WasmPlugin, WasmPluginProvider } from "./NetworkServices/WasmPlugin.vibe";
import {
  WasmPluginsVersion,
  WasmPluginsVersionProvider,
} from "./NetworkServices/WasmPluginsVersion.vibe";
import {
  BucketsDatasetsLink,
  BucketsDatasetsLinkProvider,
} from "./Observability/BucketsDatasetsLink.ts";
import { TraceScope, TraceScopeProvider } from "./Observability/TraceScope.vibe";
import {
  AutonomousDatabase,
  AutonomousDatabaseProvider,
} from "./OracleDatabase/AutonomousDatabase.vibe";
import {
  CloudExadataInfrastructure,
  CloudExadataInfrastructureProvider,
} from "./OracleDatabase/CloudExadataInfrastructure.vibe";
import { CloudVmCluster, CloudVmClusterProvider } from "./OracleDatabase/CloudVmCluster.vibe";
import { DbSystem, DbSystemProvider } from "./OracleDatabase/DbSystem.vibe";
import { ExadbVmCluster, ExadbVmClusterProvider } from "./OracleDatabase/ExadbVmCluster.vibe";
import {
  ExascaleDbStorageVault,
  ExascaleDbStorageVaultProvider,
} from "./OracleDatabase/ExascaleDbStorageVault.vibe";
import { GenerateWalletHttp } from "./OracleDatabase/GenerateWalletHttp.vibe";
import { GetAutonomousDatabaseHttp } from "./OracleDatabase/GetAutonomousDatabaseHttp.vibe";
import { GetCloudExadataInfrastructureHttp } from "./OracleDatabase/GetCloudExadataInfrastructureHttp.vibe";
import { GetCloudVmClusterHttp } from "./OracleDatabase/GetCloudVmClusterHttp.vibe";
import { GetDbSystemHttp } from "./OracleDatabase/GetDbSystemHttp.vibe";
import { GetExadbVmClusterHttp } from "./OracleDatabase/GetExadbVmClusterHttp.vibe";
import { GetExascaleDbStorageVaultHttp } from "./OracleDatabase/GetExascaleDbStorageVaultHttp.vibe";
import { GetGoldengateConnectionAssignmentHttp } from "./OracleDatabase/GetGoldengateConnectionAssignmentHttp.vibe";
import { GetGoldengateConnectionHttp } from "./OracleDatabase/GetGoldengateConnectionHttp.vibe";
import { GetGoldengateDeploymentHttp } from "./OracleDatabase/GetGoldengateDeploymentHttp.vibe";
import { GetOdbNetworkHttp } from "./OracleDatabase/GetOdbNetworkHttp.vibe";
import { GetOdbNetworksOdbSubnetHttp } from "./OracleDatabase/GetOdbNetworksOdbSubnetHttp.vibe";
import {
  GoldengateConnection,
  GoldengateConnectionProvider,
} from "./OracleDatabase/GoldengateConnection.vibe";
import {
  GoldengateConnectionAssignment,
  GoldengateConnectionAssignmentProvider,
} from "./OracleDatabase/GoldengateConnectionAssignment.vibe";
import {
  GoldengateDeployment,
  GoldengateDeploymentProvider,
} from "./OracleDatabase/GoldengateDeployment.vibe";
import { OdbNetwork, OdbNetworkProvider } from "./OracleDatabase/OdbNetwork.vibe";
import {
  OdbNetworksOdbSubnet,
  OdbNetworksOdbSubnetProvider,
} from "./OracleDatabase/OdbNetworksOdbSubnet.vibe";
import { RestartAutonomousDatabaseHttp } from "./OracleDatabase/RestartAutonomousDatabaseHttp.vibe";
import { StartAutonomousDatabaseHttp } from "./OracleDatabase/StartAutonomousDatabaseHttp.vibe";
import { StopAutonomousDatabaseHttp } from "./OracleDatabase/StopAutonomousDatabaseHttp.vibe";
import { CustomConstraint, CustomConstraintProvider } from "./OrgPolicy/CustomConstraint.vibe";
import { Policy, PolicyProvider } from "./OrgPolicy/Policy.ts";
import {
  FoldersLocationsGlobalPolicyOrchestrator,
  FoldersLocationsGlobalPolicyOrchestratorProvider,
} from "./OSConfig/FoldersLocationsGlobalPolicyOrchestrator.vibe";
import {
  OrganizationsLocationsGlobalPolicyOrchestrator,
  OrganizationsLocationsGlobalPolicyOrchestratorProvider,
} from "./OSConfig/OrganizationsLocationsGlobalPolicyOrchestrator.vibe";
import {
  ProjectsLocationsGlobalPolicyOrchestrator,
  ProjectsLocationsGlobalPolicyOrchestratorProvider,
} from "./OSConfig/ProjectsLocationsGlobalPolicyOrchestrator.vibe";
import { UsersSshPublicKey, UsersSshPublicKeyProvider } from "./OSLogin/UsersSshPublicKey.vibe";
import { GetParameterHttp } from "./ParameterManager/GetParameterHttp.vibe";
import { GetParameterVersionHttp } from "./ParameterManager/GetParameterVersionHttp.vibe";
import { Parameter, ParameterProvider } from "./ParameterManager/Parameter.ts";
import {
  ParametersVersion,
  ParametersVersionProvider,
} from "./ParameterManager/ParametersVersion.ts";
import { RenderParameterVersionHttp } from "./ParameterManager/RenderParameterVersionHttp.vibe";
import { CaPool, CaPoolProvider } from "./PrivateCA/CaPool.ts";
import {
  CertificateAuthority,
  CertificateAuthorityProvider,
} from "./PrivateCA/CertificateAuthority.ts";
import {
  CertificateTemplate,
  CertificateTemplateProvider,
} from "./PrivateCA/CertificateTemplate.ts";
import { FetchCaCertsHttp } from "./PrivateCA/FetchCaCertsHttp.vibe";
import { GetCertificateAuthorityHttp } from "./PrivateCA/GetCertificateAuthorityHttp.vibe";
import { AcknowledgeHttp } from "./PubSub/AcknowledgeHttp.vibe";
import { GetSchemaHttp } from "./PubSub/GetSchemaHttp.vibe";
import { PublishHttp } from "./PubSub/PublishHttp.vibe";
import { PullHttp } from "./PubSub/PullHttp.vibe";
import { Schema, SchemaProvider } from "./PubSub/Schema.vibe";
import {
  Snapshot as PubSubSnapshot,
  SnapshotProvider as PubSubSnapshotProvider,
} from "./PubSub/Snapshot.vibe";
import { Subscription, SubscriptionProvider } from "./PubSub/Subscription.vibe";
import { Topic, TopicProvider } from "./PubSub/Topic.vibe";
import { ValidateMessageHttp } from "./PubSub/ValidateMessageHttp.vibe";
import { AdminReservation, AdminReservationProvider } from "./PubSubLite/AdminReservation.vibe";
import { AdminSubscription, AdminSubscriptionProvider } from "./PubSubLite/AdminSubscription.vibe";
import { AdminTopic, AdminTopicProvider } from "./PubSubLite/AdminTopic.vibe";
import { CommitCursorHttp } from "./PubSubLite/CommitCursorHttp.vibe";
import { ComputeHeadCursorHttp } from "./PubSubLite/ComputeHeadCursorHttp.vibe";
import { GetPartitionsHttp } from "./PubSubLite/GetPartitionsHttp.vibe";
import { GetReservationHttp as GetPubsubliteReservationHttp } from "./PubSubLite/GetReservationHttp.vibe";
import { GetSubscriptionHttp as GetPubsubliteSubscriptionHttp } from "./PubSubLite/GetSubscriptionHttp.vibe";
import { GetTopicHttp as GetPubsubliteTopicHttp } from "./PubSubLite/GetTopicHttp.vibe";
import {
  Collector as RapidmigrationassessmentCollector,
  CollectorProvider as RapidmigrationassessmentCollectorProvider,
} from "./RapidMigrationAssessment/Collector.vibe";
import { PauseCollectorHttp } from "./RapidMigrationAssessment/PauseCollectorHttp.vibe";
import { RegisterCollectorHttp } from "./RapidMigrationAssessment/RegisterCollectorHttp.vibe";
import { ResumeCollectorHttp } from "./RapidMigrationAssessment/ResumeCollectorHttp.vibe";
import {
  BiddersPretargetingConfig,
  BiddersPretargetingConfigProvider,
} from "./RealTimeBidding/BiddersPretargetingConfig.vibe";
import { CreateAssessmentHttp as RecaptchaenterpriseCreateAssessmentHttp } from "./RecaptchaEnterprise/CreateAssessmentHttp.vibe";
import {
  Firewallpolicy as RecaptchaenterpriseFirewallpolicy,
  FirewallpolicyProvider as RecaptchaenterpriseFirewallpolicyProvider,
} from "./RecaptchaEnterprise/Firewallpolicy.vibe";
import {
  Key as RecaptchaenterpriseKey,
  KeyProvider as RecaptchaenterpriseKeyProvider,
} from "./RecaptchaEnterprise/Key.vibe";
import {
  CatalogsCatalogItem,
  CatalogsCatalogItemProvider,
} from "./RecommendationEngine/CatalogsCatalogItem.vibe";
import { GetCatalogItemHttp } from "./RecommendationEngine/GetCatalogItemHttp.vibe";
import { AclPolicy, AclPolicyProvider } from "./Redis/AclPolicy.ts";
import { GetAclPolicyHttp } from "./Redis/GetAclPolicyHttp.vibe";
import { GetAuthStringHttp } from "./Redis/GetAuthStringHttp.vibe";
import { GetInstanceHttp as GetRedisInstanceHttp } from "./Redis/GetInstanceHttp.vibe";
import {
  Instance as RedisInstance,
  InstanceProvider as RedisInstanceProvider,
} from "./Redis/Instance.ts";
import { ReadRedisHttp } from "./Redis/ReadRedisHttp.vibe";
import { ReadWriteRedisHttp } from "./Redis/ReadWriteRedisHttp.vibe";
import { WriteRedisHttp } from "./Redis/WriteRedisHttp.vibe";
import {
  Folder as ResourceManagerFolder,
  FolderProvider as ResourceManagerFolderProvider,
} from "./ResourceManager/Folder.vibe";
import { Lien, LienProvider } from "./ResourceManager/Lien.ts";
import {
  Project as ResourceManagerProject,
  ProjectProvider as ResourceManagerProjectProvider,
} from "./ResourceManager/Project.vibe";
import { TagBinding, TagBindingProvider } from "./ResourceManager/TagBinding.vibe";
import { TagKey, TagKeyProvider } from "./ResourceManager/TagKey.ts";
import { TagValue, TagValueProvider } from "./ResourceManager/TagValue.ts";
import {
  CatalogsBranchesProduct,
  CatalogsBranchesProductProvider,
} from "./Retail/CatalogsBranchesProduct.vibe";
import { CatalogsControl, CatalogsControlProvider } from "./Retail/CatalogsControl.vibe";
import { CatalogsModel, CatalogsModelProvider } from "./Retail/CatalogsModel.vibe";
import {
  CatalogsServingConfig,
  CatalogsServingConfigProvider,
} from "./Retail/CatalogsServingConfig.vibe";
import { PredictHttp as RetailPredictHttp } from "./Retail/PredictHttp.vibe";
import { SearchHttp as RetailSearchHttp } from "./Retail/SearchHttp.vibe";
import {
  Container as RunContainer,
  ContainerProvider as RunContainerProvider,
} from "./Run/Container.vibe";
import { GetServiceHttp } from "./Run/GetServiceHttp.vibe";
import { GetWorkerPoolHttp } from "./Run/GetWorkerPoolHttp.vibe";
import { Job as CloudRunJob, JobProvider as CloudRunJobProvider } from "./Run/Job.ts";
import { RunJobHttp as CloudRunRunJobHttp } from "./Run/RunJobHttp.vibe";
import { Service, ServiceProvider } from "./Run/Service.ts";
import { WorkerPool, WorkerPoolProvider } from "./Run/WorkerPool.ts";
import {
  Release as SaasservicemgmtRelease,
  ReleaseProvider as SaasservicemgmtReleaseProvider,
} from "./SaasServiceManagement/Release.vibe";
import {
  Rollout as SaasservicemgmtRollout,
  RolloutProvider as SaasservicemgmtRolloutProvider,
} from "./SaasServiceManagement/Rollout.vibe";
import {
  RolloutKind as SaasservicemgmtRolloutKind,
  RolloutKindProvider as SaasservicemgmtRolloutKindProvider,
} from "./SaasServiceManagement/RolloutKind.vibe";
import {
  Saa as SaasservicemgmtSaa,
  SaaProvider as SaasservicemgmtSaaProvider,
} from "./SaasServiceManagement/Saa.vibe";
import {
  Tenant as SaasservicemgmtTenant,
  TenantProvider as SaasservicemgmtTenantProvider,
} from "./SaasServiceManagement/Tenant.vibe";
import {
  Unit as SaasservicemgmtUnit,
  UnitProvider as SaasservicemgmtUnitProvider,
} from "./SaasServiceManagement/Unit.vibe";
import {
  UnitKind as SaasservicemgmtUnitKind,
  UnitKindProvider as SaasservicemgmtUnitKindProvider,
} from "./SaasServiceManagement/UnitKind.vibe";
import {
  UnitOperation as SaasservicemgmtUnitOperation,
  UnitOperationProvider as SaasservicemgmtUnitOperationProvider,
} from "./SaasServiceManagement/UnitOperation.vibe";
import {
  CustomersDeployment as SasportalCustomersDeployment,
  CustomersDeploymentProvider as SasportalCustomersDeploymentProvider,
} from "./SasPortal/CustomersDeployment.vibe";
import {
  CustomersDeploymentsDevice as SasportalCustomersDeploymentsDevice,
  CustomersDeploymentsDeviceProvider as SasportalCustomersDeploymentsDeviceProvider,
} from "./SasPortal/CustomersDeploymentsDevice.vibe";
import {
  CustomersDevice as SasportalCustomersDevice,
  CustomersDeviceProvider as SasportalCustomersDeviceProvider,
} from "./SasPortal/CustomersDevice.vibe";
import {
  CustomersNode as SasportalCustomersNode,
  CustomersNodeProvider as SasportalCustomersNodeProvider,
} from "./SasPortal/CustomersNode.vibe";
import {
  CustomersNodesDeployment as SasportalCustomersNodesDeployment,
  CustomersNodesDeploymentProvider as SasportalCustomersNodesDeploymentProvider,
} from "./SasPortal/CustomersNodesDeployment.vibe";
import {
  CustomersNodesDevice as SasportalCustomersNodesDevice,
  CustomersNodesDeviceProvider as SasportalCustomersNodesDeviceProvider,
} from "./SasPortal/CustomersNodesDevice.vibe";
import {
  CustomersNodesNode as SasportalCustomersNodesNode,
  CustomersNodesNodeProvider as SasportalCustomersNodesNodeProvider,
} from "./SasPortal/CustomersNodesNode.vibe";
import {
  NodesDeploymentsDevice as SasportalNodesDeploymentsDevice,
  NodesDeploymentsDeviceProvider as SasportalNodesDeploymentsDeviceProvider,
} from "./SasPortal/NodesDeploymentsDevice.vibe";
import {
  NodesDevice as SasportalNodesDevice,
  NodesDeviceProvider as SasportalNodesDeviceProvider,
} from "./SasPortal/NodesDevice.vibe";
import {
  NodesNode as SasportalNodesNode,
  NodesNodeProvider as SasportalNodesNodeProvider,
} from "./SasPortal/NodesNode.vibe";
import {
  NodesNodesDeployment as SasportalNodesNodesDeployment,
  NodesNodesDeploymentProvider as SasportalNodesNodesDeploymentProvider,
} from "./SasPortal/NodesNodesDeployment.vibe";
import {
  NodesNodesDevice as SasportalNodesNodesDevice,
  NodesNodesDeviceProvider as SasportalNodesNodesDeviceProvider,
} from "./SasPortal/NodesNodesDevice.vibe";
import {
  NodesNodesNode as SasportalNodesNodesNode,
  NodesNodesNodeProvider as SasportalNodesNodesNodeProvider,
} from "./SasPortal/NodesNodesNode.vibe";
import {
  SignedCustomersDeploymentsDevice as SasportalSignedCustomersDeploymentsDevice,
  SignedCustomersDeploymentsDeviceProvider as SasportalSignedCustomersDeploymentsDeviceProvider,
} from "./SasPortal/SignedCustomersDeploymentsDevice.vibe";
import {
  SignedCustomersDevice as SasportalSignedCustomersDevice,
  SignedCustomersDeviceProvider as SasportalSignedCustomersDeviceProvider,
} from "./SasPortal/SignedCustomersDevice.vibe";
import {
  SignedCustomersNodesDevice as SasportalSignedCustomersNodesDevice,
  SignedCustomersNodesDeviceProvider as SasportalSignedCustomersNodesDeviceProvider,
} from "./SasPortal/SignedCustomersNodesDevice.vibe";
import {
  SignedNodesDeploymentsDevice as SasportalSignedNodesDeploymentsDevice,
  SignedNodesDeploymentsDeviceProvider as SasportalSignedNodesDeploymentsDeviceProvider,
} from "./SasPortal/SignedNodesDeploymentsDevice.vibe";
import {
  SignedNodesDevice as SasportalSignedNodesDevice,
  SignedNodesDeviceProvider as SasportalSignedNodesDeviceProvider,
} from "./SasPortal/SignedNodesDevice.vibe";
import {
  SignedNodesNodesDevice as SasportalSignedNodesNodesDevice,
  SignedNodesNodesDeviceProvider as SasportalSignedNodesNodesDeviceProvider,
} from "./SasPortal/SignedNodesNodesDevice.vibe";
import { AccessSecretVersionHttp } from "./SecretManager/AccessSecretVersionHttp.vibe";
import { AddSecretVersionHttp } from "./SecretManager/AddSecretVersionHttp.vibe";
import { LocationsSecret, LocationsSecretProvider } from "./SecretManager/LocationsSecret.vibe";
import { Secret, SecretProvider } from "./SecretManager/Secret.ts";
import {
  RepositoriesBranchRule,
  RepositoriesBranchRuleProvider,
} from "./SecureSourceManager/RepositoriesBranchRule.vibe";
import {
  RepositoriesHook,
  RepositoriesHookProvider,
} from "./SecureSourceManager/RepositoriesHook.vibe";
import {
  RepositoriesIssue,
  RepositoriesIssueProvider,
} from "./SecureSourceManager/RepositoriesIssue.vibe";
import {
  RepositoriesIssuesIssueComment,
  RepositoriesIssuesIssueCommentProvider,
} from "./SecureSourceManager/RepositoriesIssuesIssueComment.vibe";
import {
  RepositoriesPullRequestsPullRequestComment,
  RepositoriesPullRequestsPullRequestCommentProvider,
} from "./SecureSourceManager/RepositoriesPullRequestsPullRequestComment.vibe";
import { BigQueryExport, BigQueryExportProvider } from "./SecurityCenter/BigQueryExport.vibe";
import {
  EventThreatDetectionSettingsCustomModule,
  EventThreatDetectionSettingsCustomModuleProvider,
} from "./SecurityCenter/EventThreatDetectionSettingsCustomModule.vibe";
import {
  FolderBigQueryExport,
  FolderBigQueryExportProvider,
} from "./SecurityCenter/FolderBigQueryExport.vibe";
import {
  FolderEventThreatDetectionSettingsCustomModule,
  FolderEventThreatDetectionSettingsCustomModuleProvider,
} from "./SecurityCenter/FolderEventThreatDetectionSettingsCustomModule.vibe";
import { FolderMuteConfig, FolderMuteConfigProvider } from "./SecurityCenter/FolderMuteConfig.vibe";
import {
  FolderNotificationConfig,
  FolderNotificationConfigProvider,
} from "./SecurityCenter/FolderNotificationConfig.vibe";
import {
  FolderSecurityHealthAnalyticsSettingsCustomModule,
  FolderSecurityHealthAnalyticsSettingsCustomModuleProvider,
} from "./SecurityCenter/FolderSecurityHealthAnalyticsSettingsCustomModule.vibe";
import { MuteConfig, MuteConfigProvider } from "./SecurityCenter/MuteConfig.vibe";
import {
  NotificationConfig,
  NotificationConfigProvider,
} from "./SecurityCenter/NotificationConfig.vibe";
import {
  OrganizationBigQueryExport,
  OrganizationBigQueryExportProvider,
} from "./SecurityCenter/OrganizationBigQueryExport.vibe";
import {
  OrganizationEventThreatDetectionSettingsCustomModule,
  OrganizationEventThreatDetectionSettingsCustomModuleProvider,
} from "./SecurityCenter/OrganizationEventThreatDetectionSettingsCustomModule.vibe";
import {
  OrganizationMuteConfig,
  OrganizationMuteConfigProvider,
} from "./SecurityCenter/OrganizationMuteConfig.vibe";
import {
  OrganizationsNotificationConfig,
  OrganizationsNotificationConfigProvider,
} from "./SecurityCenter/OrganizationsNotificationConfig.vibe";
import {
  OrganizationsSecurityHealthAnalyticsSettingsCustomModule,
  OrganizationsSecurityHealthAnalyticsSettingsCustomModuleProvider,
} from "./SecurityCenter/OrganizationsSecurityHealthAnalyticsSettingsCustomModule.vibe";
import {
  SecurityHealthAnalyticsSettingsCustomModule,
  SecurityHealthAnalyticsSettingsCustomModuleProvider,
} from "./SecurityCenter/SecurityHealthAnalyticsSettingsCustomModule.vibe";
import { Posture, PostureProvider } from "./SecurityPosture/Posture.ts";
import {
  PostureDeployment,
  PostureDeploymentProvider,
} from "./SecurityPosture/PostureDeployment.vibe";
import {
  Endpoint as ServiceDirectoryEndpoint,
  EndpointProvider as ServiceDirectoryEndpointProvider,
} from "./ServiceDirectory/Endpoint.vibe";
import { GetEndpointHttp as ServiceDirectoryGetEndpointHttp } from "./ServiceDirectory/GetEndpointHttp.vibe";
import { Namespace, NamespaceProvider } from "./ServiceDirectory/Namespace.vibe";
import { ResolveHttp as ServiceDirectoryResolveHttp } from "./ServiceDirectory/ResolveHttp.vibe";
import {
  Service as ServiceDirectoryService,
  ServiceProvider as ServiceDirectoryServiceProvider,
} from "./ServiceDirectory/Service.vibe";
import {
  Service as ServicemanagementService,
  ServiceProvider as ServicemanagementServiceProvider,
} from "./ServiceManagement/Service.vibe";
import { Connection, ConnectionProvider } from "./ServiceNetworking/Connection.ts";
import { ProjectService, ProjectServiceProvider } from "./ServiceUsage/ProjectService.vibe";
import { WebResource, WebResourceProvider } from "./SiteVerification/WebResource.vibe";
import {
  Database as SpannerDatabase,
  DatabaseProvider as SpannerDatabaseProvider,
} from "./Spanner/Database.ts";
import { ExecuteSqlHttp as SpannerExecuteSqlHttp } from "./Spanner/ExecuteSqlHttp.ts";
import { GetDdlHttp as SpannerGetDdlHttp } from "./Spanner/GetDdlHttp.vibe";
import { GetInstanceHttp as GetSpannerInstanceHttp } from "./Spanner/GetInstanceHttp.vibe";
import {
  Instance as SpannerInstance,
  InstanceProvider as SpannerInstanceProvider,
} from "./Spanner/Instance.ts";
import {
  InstanceConfig as SpannerInstanceConfig,
  InstanceConfigProvider as SpannerInstanceConfigProvider,
} from "./Spanner/InstanceConfig.ts";
import {
  InstancesBackup as SpannerInstancesBackup,
  InstancesBackupProvider as SpannerInstancesBackupProvider,
} from "./Spanner/InstancesBackup.ts";
import {
  InstancesDatabasesBackupSchedule as SpannerInstancesDatabasesBackupSchedule,
  InstancesDatabasesBackupScheduleProvider as SpannerInstancesDatabasesBackupScheduleProvider,
} from "./Spanner/InstancesDatabasesBackupSchedule.vibe";
import {
  InstancesInstancePartition as SpannerInstancesInstancePartition,
  InstancesInstancePartitionProvider as SpannerInstancesInstancePartitionProvider,
} from "./Spanner/InstancesInstancePartition.ts";
import { CustomClass, CustomClassProvider } from "./Speech/CustomClass.vibe";
import { GetCustomClassHttp } from "./Speech/GetCustomClassHttp.vibe";
import { GetPhraseSetHttp } from "./Speech/GetPhraseSetHttp.vibe";
import { PhraseSet, PhraseSetProvider } from "./Speech/PhraseSet.vibe";
import { RecognizeHttp } from "./Speech/RecognizeHttp.vibe";
import {
  Backup as SqlBackupBackup,
  BackupProvider as SqlBackupBackupProvider,
} from "./SQL/Backup.ts";
import {
  BackupRun as SqlBackupRun,
  BackupRunProvider as SqlBackupRunProvider,
} from "./SQL/BackupRun.ts";
import {
  Database as SqlDatabase,
  DatabaseProvider as SqlDatabaseProvider,
} from "./SQL/Database.ts";
import { ExecuteSqlHttp } from "./SQL/ExecuteSqlHttp.vibe";
import { GetInstanceHttp as GetSqlInstanceHttp } from "./SQL/GetInstanceHttp.vibe";
import { GetUserHttp as GetSqlUserHttp } from "./SQL/GetUserHttp.vibe";
import {
  Instance as SqlInstance,
  InstanceProvider as SqlInstanceProvider,
} from "./SQL/Instance.ts";
import { SslCert as SqlSslCert, SslCertProvider as SqlSslCertProvider } from "./SQL/SslCert.ts";
import { User as SqlUser, UserProvider as SqlUserProvider } from "./SQL/User.ts";
import { Bucket, BucketProvider } from "./Storage/Bucket.vibe";
import {
  BucketAccessControl,
  BucketAccessControlProvider,
} from "./Storage/BucketAccessControl.vibe";
import {
  DefaultObjectAccessControl,
  DefaultObjectAccessControlProvider,
} from "./Storage/DefaultObjectAccessControl.vibe";
import { DeleteObjectHttp } from "./Storage/DeleteObjectHttp.vibe";
import { Folder, FolderProvider } from "./Storage/Folder.vibe";
import { GetObjectHttp } from "./Storage/GetObjectHttp.vibe";
import { HmacKey, HmacKeyProvider } from "./Storage/HmacKey.ts";
import { Managed, ManagedProvider } from "./Storage/Managed.vibe";
import { Notification, NotificationProvider } from "./Storage/Notification.vibe";
import {
  Object as StorageObject,
  ObjectProvider as StorageObjectProvider,
} from "./Storage/Object.ts";
import {
  ObjectAccessControl,
  ObjectAccessControlProvider,
} from "./Storage/ObjectAccessControl.vibe";
import { PutObjectHttp } from "./Storage/PutObjectHttp.vibe";
import { AgentPool, AgentPoolProvider } from "./StorageTransfer/AgentPool.vibe";
import { GetGoogleServiceAccountHttp } from "./StorageTransfer/GetGoogleServiceAccountHttp.vibe";
import { RunTransferJobHttp } from "./StorageTransfer/RunTransferJobHttp.vibe";
import { TransferJob, TransferJobProvider } from "./StorageTransfer/TransferJob.vibe";
import { GetNodeHttp as GetTpuNodeHttp } from "./TPU/GetNodeHttp.vibe";
import { GetQueuedResourceHttp as GetTpuQueuedResourceHttp } from "./TPU/GetQueuedResourceHttp.vibe";
import { Node as TpuNode, NodeProvider as TpuNodeProvider } from "./TPU/Node.vibe";
import {
  QueuedResource as TpuQueuedResource,
  QueuedResourceProvider as TpuQueuedResourceProvider,
} from "./TPU/QueuedResource.vibe";
import { CreateJobHttp } from "./Transcoder/CreateJobHttp.vibe";
import { JobTemplate, JobTemplateProvider } from "./Transcoder/JobTemplate.vibe";
import { AdaptiveMtDataset, AdaptiveMtDatasetProvider } from "./Translate/AdaptiveMtDataset.vibe";
import { AdaptiveMtTranslateHttp } from "./Translate/AdaptiveMtTranslateHttp.vibe";
import { GetAdaptiveMtDatasetHttp } from "./Translate/GetAdaptiveMtDatasetHttp.vibe";
import { GetGlossariesGlossaryEntryHttp } from "./Translate/GetGlossariesGlossaryEntryHttp.vibe";
import { GetModelHttp as TranslateGetModelHttp } from "./Translate/GetModelHttp.vibe";
import {
  GlossariesGlossaryEntry,
  GlossariesGlossaryEntryProvider,
} from "./Translate/GlossariesGlossaryEntry.vibe";
import {
  Model as TranslateModel,
  ModelProvider as TranslateModelProvider,
} from "./Translate/Model.vibe";
import { TranslateTextHttp } from "./Translate/TranslateTextHttp.vibe";
import { Matter, MatterProvider } from "./Vault/Matter.vibe";
import { MattersExport, MattersExportProvider } from "./Vault/MattersExport.vibe";
import { MattersHold, MattersHoldProvider } from "./Vault/MattersHold.vibe";
import { MattersSavedQuery, MattersSavedQueryProvider } from "./Vault/MattersSavedQuery.vibe";
import {
  Product as VisionProduct,
  ProductProvider as VisionProductProvider,
} from "./Vision/Product.vibe";
import {
  ProductSet as VisionProductSet,
  ProductSetProvider as VisionProductSetProvider,
} from "./Vision/ProductSet.vibe";
import {
  ProductsReferenceImage,
  ProductsReferenceImageProvider,
} from "./Vision/ProductsReferenceImage.vibe";
import {
  Group as VmmigrationGroup,
  GroupProvider as VmmigrationGroupProvider,
} from "./VMMigration/Group.vibe";
import {
  ImageImport as VmmigrationImageImport,
  ImageImportProvider as VmmigrationImageImportProvider,
} from "./VMMigration/ImageImport.vibe";
import {
  Source as VmmigrationSource,
  SourceProvider as VmmigrationSourceProvider,
} from "./VMMigration/Source.vibe";
import {
  SourcesDatacenterConnector,
  SourcesDatacenterConnectorProvider,
} from "./VMMigration/SourcesDatacenterConnector.vibe";
import {
  SourcesDiskMigrationJob,
  SourcesDiskMigrationJobProvider,
} from "./VMMigration/SourcesDiskMigrationJob.vibe";
import {
  SourcesMigratingVm,
  SourcesMigratingVmProvider,
} from "./VMMigration/SourcesMigratingVm.vibe";
import {
  SourcesUtilizationReport,
  SourcesUtilizationReportProvider,
} from "./VMMigration/SourcesUtilizationReport.vibe";
import {
  Target as VmmigrationTarget,
  TargetProvider as VmmigrationTargetProvider,
} from "./VMMigration/Target.vibe";
import {
  Datastore as VmwareengineDatastore,
  DatastoreProvider as VmwareengineDatastoreProvider,
} from "./VMwareEngine/Datastore.vibe";
import { NetworkPeering, NetworkPeeringProvider } from "./VMwareEngine/NetworkPeering.vibe";
import {
  NetworkPoliciesExternalAccessRule,
  NetworkPoliciesExternalAccessRuleProvider,
} from "./VMwareEngine/NetworkPoliciesExternalAccessRule.vibe";
import {
  NetworkPolicy as VmwareengineNetworkPolicy,
  NetworkPolicyProvider as VmwareengineNetworkPolicyProvider,
} from "./VMwareEngine/NetworkPolicy.vibe";
import { PrivateCloud, PrivateCloudProvider } from "./VMwareEngine/PrivateCloud.vibe";
import {
  PrivateCloudsCluster,
  PrivateCloudsClusterProvider,
} from "./VMwareEngine/PrivateCloudsCluster.vibe";
import {
  PrivateCloudsExternalAddress,
  PrivateCloudsExternalAddressProvider,
} from "./VMwareEngine/PrivateCloudsExternalAddress.vibe";
import {
  PrivateCloudsLoggingServer,
  PrivateCloudsLoggingServerProvider,
} from "./VMwareEngine/PrivateCloudsLoggingServer.vibe";
import {
  PrivateCloudsManagementDnsZoneBinding,
  PrivateCloudsManagementDnsZoneBindingProvider,
} from "./VMwareEngine/PrivateCloudsManagementDnsZoneBinding.vibe";
import {
  PrivateConnection,
  PrivateConnectionProvider,
} from "./VMwareEngine/PrivateConnection.vibe";
import {
  VmwareEngineNetwork,
  VmwareEngineNetworkProvider,
} from "./VMwareEngine/VmwareEngineNetwork.vibe";
import { Connector, ConnectorProvider } from "./VpcAccess/Connector.ts";
import { ScanConfig, ScanConfigProvider } from "./WebSecurityScanner/ScanConfig.vibe";
import { CreateExecutionHttp } from "./Workflows/CreateExecutionHttp.vibe";
import { Workflow, WorkflowProvider } from "./Workflows/Workflow.ts";
import {
  DeploymentsActuation,
  DeploymentsActuationProvider,
} from "./WorkloadManager/DeploymentsActuation.vibe";
import {
  Evaluation as WorkloadmanagerEvaluation,
  EvaluationProvider as WorkloadmanagerEvaluationProvider,
} from "./WorkloadManager/Evaluation.vibe";
import {
  Subscription as WorkspaceeventsSubscription,
  SubscriptionProvider as WorkspaceeventsSubscriptionProvider,
} from "./WorkspaceEvents/Subscription.vibe";
import { GenerateAccessTokenHttp } from "./Workstations/GenerateAccessTokenHttp.vibe";
import { GetWorkstationClusterHttp } from "./Workstations/GetWorkstationClusterHttp.vibe";
import { GetWorkstationConfigHttp } from "./Workstations/GetWorkstationConfigHttp.vibe";
import { GetWorkstationHttp } from "./Workstations/GetWorkstationHttp.vibe";
import { StartWorkstationHttp } from "./Workstations/StartWorkstationHttp.vibe";
import { StopWorkstationHttp } from "./Workstations/StopWorkstationHttp.vibe";
import {
  WorkstationCluster,
  WorkstationClusterProvider,
} from "./Workstations/WorkstationCluster.vibe";
import {
  WorkstationClustersWorkstationConfig,
  WorkstationClustersWorkstationConfigProvider,
} from "./Workstations/WorkstationClustersWorkstationConfig.vibe";
import {
  WorkstationClustersWorkstationConfigsWorkstation,
  WorkstationClustersWorkstationConfigsWorkstationProvider,
} from "./Workstations/WorkstationClustersWorkstationConfigsWorkstation.vibe";

export class Providers extends Provider.ProviderCollection<Providers>()("GCP") {}

export type ProviderRequirements = Layer.Services<ReturnType<typeof providers>>;

/**
 * Build a layer that registers all GCP resource providers, the GCP
 * `AuthProvider`, the resolved `Credentials`, and an `HttpClient`. Include
 * this from your stack alongside other cloud `providers()` layers.
 *
 * Resource providers are inserted into {@link Provider.collection} as they
 * land.
 *
 * @example
 * ```typescript
 * import * as Alchemy from "alchemy";
 * import * as GCP from "@alchemy.run/gcp";
 * import * as Effect from "effect/Effect";
 *
 * export default Alchemy.Stack(
 *   "MyStack",
 *   {
 *     providers: GCP.providers(),
 *     state: Alchemy.localState(),
 *   },
 *   Effect.gen(function* () {
 *     return {};
 *   }),
 * );
 * ```
 */
/** Auth + env + HTTP client for resource providers, HTTP bindings, and GKE. */
const gcpLive = fromCredentials().pipe(
  Layer.provideMerge(Credentials.fromAuthProvider()),
  Layer.provideMerge(GcpAuth),
  Layer.provideMerge(ProfileStoreLive),
  Layer.provideMerge(CredentialsStoreLive),
  Layer.provideMerge(FetchHttpClient.layer),
);

const makeProviders = () =>
  // oxlint-disable-next-line effecttsgo/unsafe-effect-type-assertion -- erased on purpose, see comment at the cast below
  Layer.effect(
    Providers,
    Effect.gen(function* () {
      // Each `Provider.collection` chunk is erased to its runtime shape:
      // its requirements (one Provider<X> per resource type) are satisfied
      // by the `Layer.provide` below, and letting tsc infer ~1,000 of them
      // exhausts the type-checker's memory.
      const merged: Record<string, any> = {};
      Object.assign(
        merged,
        (yield* Provider.collection([
          Bucket,
          Notification,
          HmacKey,
          BucketAccessControl,
          DefaultObjectAccessControl,
          Folder,
          Managed,
          ObjectAccessControl,
          StorageObject,
          AgentPool,
          TransferJob,
          Topic,
          Subscription,
          Schema,
          PubSubSnapshot,
          AdminReservation,
          AdminTopic,
          AdminSubscription,
          KeyRing,
          CryptoKey,
          CryptoKeyVersion,
          ImportJob,
          SingleTenantHsmInstanceProposal,
          Sink,
          Metric,
          LogBucket,
          Exclusion,
          BucketsView,
          BucketsLink,
          LogScope,
          SavedQuery,
          BillingExclusion,
          BillingBucket,
          BillingBucketsLink,
          BillingBucketsView,
          BillingSavedQuery,
          BillingSink,
          FolderExclusion,
          FolderBucket,
          FolderBucketsLink,
          FolderBucketsView,
          FolderLogScope,
          FolderSavedQuery,
          FolderSink,
          LocationsBucket,
          LocationsBucketsLink,
          LocationsBucketsView,
          OrganizationExclusion,
          OrganizationLogBucket,
          OrganizationBucketsLink,
          OrganizationBucketsView,
          OrganizationLogScope,
          OrganizationSavedQuery,
          OrganizationSink,
          Secret,
          LocationsSecret,
          Parameter,
          ParametersVersion,
          TagValue,
          Certificate,
          CertificateMap,
          CertificateMapEntry,
          DnsAuthorization,
          TrustConfig,
          CertificateIssuanceConfig,
          CaPool,
          CertificateAuthority,
          CertificateTemplate,
          Dataset,
          Table,
          Routine,
          BigQueryJob,
          RowAccessPolicy,
          DataPolicy,
          TransferConfig,
          BillingBudget,
          BigQueryConnection,
          Reservation,
          CapacityCommitment,
          ReservationGroup,
          CloudFunction,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          Database,
          DatabasesBackupSchedule,
          DatabasesCollectionGroupsIndex,
          DatabasesUserCred,
          DatastoreIndex,
          RedisInstance,
          AclPolicy,
          CatalogsBranchesProduct,
          CatalogsControl,
          CatalogsModel,
          CatalogsServingConfig,
          CatalogsCatalogItem,
          MemcacheInstance,
          MlModel,
          ModelsVersion,
          FilestoreInstance,
          FilestoreBackup,
          FilestoreInstancesSnapshot,
          TpuNode,
          TpuQueuedResource,
          FirebaseapphostingBackend,
          BackendsBuild,
          BackendsDomain,
          FirebaserulesRuleset,
          FirebaserulesRelease,
          AppsDebugToken,
          ServicesResourcePolicy,
          FirebaseappdistributionGroup,
          FirebasedataconnectService,
          ServicesSchema,
          ServicesConnector,
          NetappActiveDirectory,
          NetappBackupPolicy,
          NetappBackupVault,
          NetappBackupVaultsBackup,
          NetappHostGroup,
          NetappKmsConfig,
          NetappStoragePool,
          NetappVolume,
          NetappVolumesQuotaRule,
          SpannerInstance,
          SpannerDatabase,
          SpannerInstanceConfig,
          SpannerInstancesBackup,
          SpannerInstancesDatabasesBackupSchedule,
          SpannerInstancesInstancePartition,
          AlloyDbCluster,
          AlloyDbInstance,
          AlloyDbBackup,
          AlloyDbClustersUser,
          GoldengateDeployment,
          OdbNetwork,
          OdbNetworksOdbSubnet,
          AutonomousDatabase,
          CloudExadataInfrastructure,
          CloudVmCluster,
          DbSystem,
          ExadbVmCluster,
          ExascaleDbStorageVault,
          GoldengateConnection,
          GoldengateConnectionAssignment,
          BigtableInstance,
          BigtableCluster,
          BigtableAppProfile,
          BigtableTable,
          BigtableInstancesClustersBackup,
          BigtableInstancesLogicalView,
          BigtableInstancesMaterializedView,
          BigtableInstancesTablesAuthorizedView,
          BigtableInstancesTablesSchemaBundle,
          DataprocCluster,
          DataprocAutoscalingPolicy,
          DataprocBatche,
          DataprocRegionsAutoscalingPolicy,
          DataprocRegionsWorkflowTemplate,
          DataprocSession,
          DataprocSessionTemplate,
          DataprocWorkflowTemplate,
          Cluster,
          NodePool,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          ClustersNodePool,
          SqlInstance,
          SqlDatabase,
          SqlSslCert,
          SqlUser,
          SqlBackupBackup,
          SqlBackupRun,
          Repository,
          RepositoriesAttachment,
          RepositoriesPackagesTag,
          RepositoriesRule,
          Queue,
          Job,
          CloudRunJob,
          RunContainer,
          Service,
          WebsiteServer,
          WorkerPool,
          ManagedZone,
          DnsPolicy,
          ResourceRecordSet,
          ResponsePolicy,
          ResponsePolicyRule,
          Address,
          BackendBucket,
          BackendService,
          RegionBackendService,
          HealthCheck,
          HttpHealthCheck,
          HttpsHealthCheck,
          RegionHealthCheck,
          Image,
          MachineImage,
          Instance,
          InstanceGroup,
          InstanceGroupManager,
          Autoscaler,
          RegionAutoscaler,
          InstanceTemplate,
          RegionInstanceGroupManager,
          Disk,
          RegionDisk,
          Snapshot,
          InstantSnapshot,
          InstantSnapshotGroup,
          CrossSiteNetwork,
          FutureReservation,
          GlobalPublicDelegatedPrefix,
          GlobalVmExtensionPolicy,
          InstanceGroupManagerResizeRequest,
          Network,
          NetworkEndpointGroup,
          GlobalNetworkEndpointGroup,
          Subnetwork,
          GlobalAddress,
          RegionNetworkEndpointGroup,
          Route,
          ResourcePolicy,
          SecurityPolicy,
          OrganizationSecurityPolicy,
          PublicAdvertisedPrefix,
          PublicDelegatedPrefix,
          RegionBackendBucket,
          RegionCompositeHealthCheck,
          RegionHealthAggregationPolicy,
          RegionHealthCheckService,
          RegionHealthSource,
          RegionInstanceGroupManagerResizeRequest,
          RegionInstanceTemplate,
          ServiceAttachment,
          Interconnect,
          InterconnectAttachment,
          InterconnectGroup,
          InterconnectAttachmentGroup,
          License,
          NetworkAttachment,
          NetworkEdgeSecurityService,
          NetworkFirewallPolicy,
          NodeGroup,
          NodeTemplate,
          Router,
          Firewall,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          FirewallPolicy,
          ForwardingRule,
          PacketMirroring,
          UrlMap,
          RegionUrlMap,
          TargetHttpProxy,
          RegionTargetHttpProxy,
          TargetHttpsProxy,
          TargetInstance,
          TargetPool,
          TargetSslProxy,
          TargetTcpProxy,
          TargetGrpcProxy,
          GlobalForwardingRule,
          SslCertificate,
          SslPolicy,
          RegionSslCertificate,
          RegionSslPolicy,
          RegionNetworkFirewallPolicy,
          RegionNotificationEndpoint,
          RegionSecurityPolicy,
          RegionSnapshot,
          RegionInstantSnapshot,
          RegionInstantSnapshotGroup,
          RegionTargetHttpsProxy,
          RegionTargetTcpProxy,
          VpnGateway,
          TargetVpnGateway,
          ExternalVpnGateway,
          VpnTunnel,
          ComputeReservation,
          RolloutPlan,
          StoragePool,
          WireGroup,
          ZoneVmExtensionPolicy,
          Connector,
          Connection,
          CloudBuildConnection,
          CloudBuildRepository,
          Workflow,
          Trigger,
          Channel,
          MessageBus,
          Pipeline,
          Enrollment,
          GoogleApiSource,
          ChannelConnection,
          EssentialcontactsContact,
          FolderContact,
          OrganizationContact,
          Namespace,
          ServiceDirectoryService,
          ServiceDirectoryEndpoint,
          ServicemanagementService,
          TagKey,
          TagBinding,
          ResourceManagerFolder,
          Lien,
          ResourceManagerProject,
          Key,
          AgentregistryBinding,
          RecaptchaenterpriseKey,
          RecaptchaenterpriseFirewallpolicy,
          Policy,
          CustomConstraint,
          AccessPolicy,
          AccessPoliciesAccessLevel,
          AccessPoliciesAuthorizedOrgsDesc,
          AccessPoliciesServicePerimeter,
          GcpUserAccessBinding,
          Hub,
          Spoke,
          InternalRange,
          PolicyBasedRoute,
          Transport,
          AutomatedDnsRecord,
          MulticloudDataTransferConfig,
          MulticloudDataTransferConfigsDestination,
          RegionalEndpoint,
          ServiceConnectionMap,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          ServiceConnectionPolicy,
          ServiceConnectionToken,
          SpokesGatewayAdvertisedRoute,
          VpcFlowLogsConfig,
          OrganizationsVpcFlowLogsConfig,
          ConnectivityTest,
          NetworkMonitoringProvider,
          AlertPolicy,
          NotificationChannel,
          UptimeCheckConfig,
          MonitoringGroup,
          MetricDescriptor,
          MonitoringService,
          ServicesServiceLevelObjective,
          TraceScope,
          BucketsDatasetsLink,
          ComposerEnvironment,
          EnvironmentsUserWorkloadsConfigMap,
          EnvironmentsUserWorkloadsSecret,
          AppgroupsAppsKey,
          Datacollector,
          Developer,
          DevelopersApp,
          DevelopersAppsKey,
          DnsZone,
          EndpointAttachment,
          Envgroup,
          EnvgroupsAttachment,
          ApigeeEnvironment,
          TrainingPipeline,
          AIPlatformDataset,
          DatasetsDatasetVersion,
          ReasoningEngine,
          ReasoningEnginesSandboxEnvironmentTemplate,
          ReasoningEnginesSandboxEnvironment,
          ReasoningEnginesSession,
          Schedule,
          SemanticGovernancePolicy,
          SpecialistPool,
          Study,
          StudiesTrial,
          Tensorboard,
          TensorboardsExperiment,
          TensorboardsExperimentsRun,
          TensorboardsExperimentsRunsTimeSeries,
          ClientTlsPolicy,
          DnsThreatDetector,
          FirewallEndpoint,
          FirewallEndpointAssociation,
          GatewaySecurityPolicy,
          GatewaySecurityPoliciesRule,
          InterceptDeploymentGroup,
          InterceptDeployment,
          InterceptEndpointGroup,
          InterceptEndpointGroupAssociation,
          MirroringDeploymentGroup,
          MirroringDeployment,
          MirroringEndpointGroup,
          MirroringEndpointGroupAssociation,
          SacRealm,
          SacAttachment,
          SecurityProfile,
          SecurityProfileGroup,
          ServerTlsPolicy,
          TlsInspectionPolicy,
          UrlList,
          AddressGroup,
          AuthorizationPolicy,
          AuthzPolicy,
          BackendAuthenticationConfig,
          OrganizationsAddressGroup,
          OrganizationsFirewallEndpoint,
          OrganizationsSecurityProfile,
          OrganizationsSecurityProfileGroup,
          AgentGateway,
          AuthzExtension,
          EndpointPolicy,
          NetworkservicesGateway,
          GrpcRoute,
          HttpRoute,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          LbEdgeExtension,
          LbRouteExtension,
          WasmPlugin,
          WasmPluginsVersion,
          LbTrafficExtension,
          Mesh,
          MulticastConsumerAssociation,
          MulticastGroupConsumerActivation,
          ServiceBinding,
          ServiceLbPolicy,
          TcpRoute,
          TlsRoute,
          AspectType,
          DataDomain,
          DataDomainsBinding,
          DataProduct,
          DataProductsDataAsset,
          DataScan,
          EncryptionConfig,
          EntryGroup,
          EntryGroupsEntry,
          EntryGroupsEntryLink,
          EntryType,
          Glossary,
          GlossariesCategory,
          GlossariesTerm,
          Lake,
          LakesTask,
          LakesZone,
          LakesAsset,
          LakesEntity,
          LakesEntitiesPartition,
          MetadataFeed,
          TagTemplate,
          Taxonomy,
          TaxonomiesPolicyTag,
          DataStoresBranchesDocument,
          DataStoresControl,
          DataStoresConversation,
          DataStoresSchema,
          DataStoresServingConfig,
          DataStoresSession,
          DataStoresSiteSearchEngineTargetSite,
          IdentityMappingStore,
          DataStore,
          CollectionsEngine,
          CollectionsEnginesAssistant,
          CollectionsEnginesAssistantsAgentsA2aV1TasksPushNotificationConfig,
          CollectionsEnginesControl,
          CollectionsEnginesConversation,
          CollectionsEnginesServingConfig,
          CollectionsEnginesSession,
          CollectionsDataStore,
          CollectionsDataStoresBranchesDocument,
          CollectionsDataStoresControl,
          CollectionsDataStoresConversation,
          CollectionsDataStoresSchema,
          CollectionsDataStoresServingConfig,
          CollectionsDataStoresSession,
          CollectionsDataStoresSiteSearchEngineTargetSite,
          AnalysisRule,
          AssessmentRule,
          AuthorizedViewSet,
          AuthorizedViewSetsAuthorizedView,
          AuthorizedViewSetsAuthorizedViewsConversationsAssessment,
          AuthorizedViewSetsAuthorizedViewsConversationsFeedbackLabel,
          AutoLabelingRule,
          Conversation,
          ConversationsAnalyses,
          ConversationsAssessment,
          ConversationsFeedbackLabel,
          Dashboard,
          DashboardsChart,
          DatasetsConversationsFeedbackLabel,
          IssueModel,
          IssueModelsIssue,
          PhraseMatcher,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          QaQuestionTag,
          QaScorecard,
          QaScorecardsRevision,
          QaScorecardsRevisionsQaQuestion,
          View,
          ContactCenter,
          AgentsEntityType,
          AgentsEnvironment,
          AgentsEnvironmentsExperiment,
          AgentsEnvironmentsSessionsEntityType,
          AgentsFlow,
          AgentsFlowsPage,
          AgentsFlowsTransitionRouteGroup,
          AgentsFlowsVersion,
          AgentsGenerator,
          AgentsIntent,
          AgentsPlaybook,
          AgentsPlaybooksExample,
          AgentsPlaybooksVersion,
          AgentsSessionsEntityType,
          AgentsTool,
          AgentsToolsVersion,
          AgentsTransitionRouteGroup,
          AgentsWebhook,
          SecuritySetting,
          OrganizationStoredInfoType,
          DeidentifyTemplate,
          DlpJob,
          InspectTemplate,
          JobTrigger,
          ContentPolicy,
          LocationsDeidentifyTemplate,
          LocationsDlpJob,
          LocationsInspectTemplate,
          LocationsJobTrigger,
          LocationsStoredInfoType,
          StoredInfoType,
          DiscoveryConfig,
          OrganizationsDeidentifyTemplate,
          OrganizationsInspectTemplate,
          OrganizationsLocationsConnection,
          OrganizationsLocationsDeidentifyTemplate,
          OrganizationsLocationsDiscoveryConfig,
          OrganizationsLocationsInspectTemplate,
          OrganizationsLocationsJobTrigger,
          OrganizationsLocationsStoredInfoType,
          GmailpostmastertoolsDomain,
          DomainsUser,
          SettingsDatasource,
          SettingsSearchapplication,
          SupportEventSubscription,
          Matter,
          MattersExport,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          MattersHold,
          MattersSavedQuery,
          WorkspaceeventsSubscription,
          JobsTenant,
          TenantsCompany,
          TenantsJob,
          VisionProductSet,
          VisionProduct,
          ProductsReferenceImage,
          CustomClass,
          PhraseSet,
          MonetizationSubscription,
          MonetizationSubscriptionsBasePlansOffer,
          Edit,
          Inappproduct,
          AchievementConfiguration,
          LeaderboardConfiguration,
          Storelayoutcluster,
          Storelayoutpage,
          Webapp,
          AndroidmanagementEnterprise,
          EnterprisesEnrollmentToken,
          EnterprisesWebApp,
          CustomersConfiguration,
          CustomersConnectorConfig,
          AppsAuthorizedCertificate,
          AppsDomainMapping,
          AppsFirewallIngressRule,
          AppsServicesVersion,
          ApplicationsAuthorizedCertificate,
          ApplicationsDomainMapping,
          UsersSshPublicKey,
          LicenseAssignment,
          WebResource,
          CloudassetFeed,
          CloudassetSavedQuery,
          CloudidentityDevice,
          CloudidentityGroup,
          GroupsMembership,
          InboundOidcSsoProfile,
          InboundSamlSsoProfile,
          InboundSsoAssignment,
          CloudchannelCustomer,
          ChannelPartnerLinksCustomer,
          CustomersCustomerRepricingConfig,
          ChannelPartnerLinksChannelPartnerRepricingConfig,
          CloudcontrolspartnerCustomer,
          DeploymentmanagerDeployment,
          HealthcareDataset,
          DatasetsConsentStore,
          DatasetsConsentStoresAttributeDefinition,
          DatasetsConsentStoresConsent,
          DatasetsConsentStoresConsentArtifact,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          DatasetsConsentStoresUserDataMapping,
          DatasetsDicomStore,
          DatasetsFhirStore,
          DatasetsHl7V2Store,
          DatasetsHl7V2StoresMessage,
          BrandsIdentityAwareProxyClient,
          IapDestGroup,
          FolderBigQueryExport,
          FolderEventThreatDetectionSettingsCustomModule,
          FolderMuteConfig,
          FolderNotificationConfig,
          FolderSecurityHealthAnalyticsSettingsCustomModule,
          OrganizationBigQueryExport,
          OrganizationEventThreatDetectionSettingsCustomModule,
          OrganizationMuteConfig,
          NotificationConfig,
          OrganizationsNotificationConfig,
          MuteConfig,
          BigQueryExport,
          EventThreatDetectionSettingsCustomModule,
          SecurityHealthAnalyticsSettingsCustomModule,
          OrganizationsSecurityHealthAnalyticsSettingsCustomModule,
          Posture,
          PostureDeployment,
          ApihubDeployment,
          ExternalApi,
          Plugin,
          PluginsInstance,
          RuntimeProjectAttachment,
          ApiHubInstance,
          ApihubApi,
          ApisVersion,
          ApisVersionsOperation,
          ApisVersionsSpec,
          ApihubAttribute,
          Curation,
          Dependency,
          Application,
          ApplicationsService,
          ApplicationsWorkload,
          ServiceProjectAttachment,
          ObservationJob,
          ObservationSource,
          ApisConfig,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          MerchantReview,
          ProductReview,
          ContentwarehouseDocumentSchema,
          ContentwarehouseDocument,
          ContentwarehouseRuleSet,
          ContentwarehouseSynonymSet,
          SfdcInstance,
          SfdcInstancesSfdcChannel,
          IntegrationsTemplate,
          AuthConfig,
          IntegrationsVersion,
          IntegrationsVersionsTestCases,
          ProductsAuthConfig,
          ProductsCertificate,
          ProductsIntegrationsVersion,
          ProductsSfdcInstance,
          ProductsSfdcInstancesSfdcChannel,
          MigrationcenterSource,
          MigrationcenterAssetsExportJob,
          MigrationcenterDiscoveryClient,
          MigrationcenterGroup,
          MigrationcenterImportJob,
          MigrationcenterImportJobsImportDataFile,
          MigrationcenterPreferenceSet,
          MigrationcenterReportConfig,
          MigrationcenterReportConfigsReport,
          RapidmigrationassessmentCollector,
          MetastoreFederation,
          MetastoreService,
          MetastoreServicesBackup,
          DataformRepository,
          ProjectsLocationsFolder,
          RepositoriesReleaseConfig,
          RepositoriesWorkflowConfig,
          RepositoriesWorkflowInvocation,
          RepositoriesWorkspace,
          Team,
          VolumesSnapshot,
          VolumesReplication,
          VmwareEngineNetwork,
          PrivateConnection,
          PrivateCloudsManagementDnsZoneBinding,
          VmwareengineDatastore,
          NetworkPeering,
          VmwareengineNetworkPolicy,
          NetworkPoliciesExternalAccessRule,
          PrivateCloud,
          PrivateCloudsCluster,
          PrivateCloudsExternalAddress,
          PrivateCloudsLoggingServer,
          CesApp,
          AppsAgent,
          AppsDeployment,
          AppsExample,
          AppsGuardrail,
          AppsTool,
          AppsToolset,
          AppsVersion,
          SasportalCustomersDeployment,
          SasportalCustomersDevice,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          SasportalCustomersNode,
          SasportalNodesDevice,
          SasportalNodesNode,
          DatalabelingAnnotationSpecSet,
          DatalabelingDataset,
          DatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessage,
          DatalabelingEvaluationJob,
          DatalabelingInstruction,
          Process,
          ProcessesRun,
          ProcessesRunsLineageEvent,
          DataExchange,
          DataExchangesListing,
          DataExchangesQueryTemplate,
          SaasservicemgmtSaa,
          SaasservicemgmtTenant,
          SaasservicemgmtUnitKind,
          SaasservicemgmtUnit,
          SaasservicemgmtRelease,
          SaasservicemgmtRolloutKind,
          SaasservicemgmtRollout,
          SaasservicemgmtUnitOperation,
          RegistryBook,
          Realm,
          CustomRange,
          IpamAdminScope,
          VmmigrationGroup,
          VmmigrationImageImport,
          VmmigrationSource,
          SourcesDatacenterConnector,
          SourcesDiskMigrationJob,
          SourcesMigratingVm,
          SourcesUtilizationReport,
          VmmigrationTarget,
          DatamigrationConnectionProfile,
          DatamigrationConversionWorkspace,
          ConversionWorkspacesMappingRule,
          DatamigrationMigrationJob,
          DatamigrationPrivateConnection,
          DatastreamConnectionProfile,
          DatastreamPrivateConnection,
          PrivateConnectionsRoute,
          DatastreamStream,
          AccountConnector,
          DeveloperconnectConnection,
          ConnectionsGitRepositoryLink,
          InsightsConfig,
          BackupChannel,
          BackupPlan,
          BackupPlansBackup,
          RestoreChannel,
          RestorePlan,
          RestorePlansRestore,
          MembershipsFeature,
          InstancesBackup,
          BareMetalCluster,
          BareMetalClustersBareMetalNodePool,
          GkeonpremVmwareCluster,
          VmwareClustersVmwareNodePool,
          BackupdrBackupVault,
          BackupdrBackupPlan,
          BackupPlanAssociation,
          BackupdrManagementServer,
          BaremetalsolutionNfsShare,
          BaremetalsolutionVolumesSnapshot,
          ManagedidentitiesDomain,
          ManagedidentitiesDomainsBackup,
          ManagedidentitiesPeering,
          CustomTargetType,
          DeliveryPipeline,
          DeliveryPipelinesAutomation,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          DeployPolicy,
          ClouddeployTarget,
          ConfigDeploymentGroup,
          ConfigPreview,
          AppConnection,
          AppConnector,
          AppGateway,
          SecurityGateway,
          SecurityGatewaysApplication,
          ManagedKafkaCluster,
          ClustersAcl,
          ClustersTopic,
          ManagedKafkaConnectCluster,
          ConnectClustersConnector,
          ManagedKafkaSchemaRegistry,
          SchemaRegistriesSubjectsVersion,
          SchemaRegistriesContextsSubjectsVersion,
          RepositoriesBranchRule,
          RepositoriesHook,
          RepositoriesIssue,
          RepositoriesIssuesIssueComment,
          RepositoriesPullRequestsPullRequestComment,
          ContaineranalysisNote,
          ContaineranalysisOccurrence,
          LocationsNote,
          LocationsOccurrence,
          BinaryauthorizationAttestor,
          PlatformsPolicy,
          BlockchainNode,
          BuyersClientsUser,
          AccountTypesUserList,
          BiddersPretargetingConfig,
          DatapipelinesPipeline,
          AgentidentityAuthProvider,
          BiglakeCatalog,
          CatalogsDatabase,
          CatalogsDatabasesTable,
          DocumentaiProcessor,
          DocumentaiSchema,
          SchemasSchemaVersion,
          FoldersLocationsGlobalPolicyOrchestrator,
          OrganizationsLocationsGlobalPolicyOrchestrator,
          ProjectsLocationsGlobalPolicyOrchestrator,
          AdaptiveMtDataset,
          GlossariesGlossaryEntry,
          TranslateModel,
          WorkstationCluster,
          WorkstationClustersWorkstationConfig,
          WorkstationClustersWorkstationConfigsWorkstation,
          AssuredworkloadsWorkload,
          WorkloadmanagerEvaluation,
          DeploymentsActuation,
          ConnectionsEntityTypesEntity,
          Agent,
          BatchPredictionJob,
          CachedContent,
          CustomJob,
          DataLabelingJob,
          DeploymentResourcePool,
          EvaluationItem,
          EvaluationRun,
          EvaluationSet,
          FeatureGroup,
          FeatureGroupsFeature,
          FeatureOnlineStore,
          Featurestore,
          FeaturestoresEntityType,
          HyperparameterTuningJob,
          TuningJob,
          AIPlatformIndex,
          IndexEndpoint,
          AIPlatformEndpoint,
          MetadataStore,
          MetadataStoresArtifact,
          MetadataStoresContext,
          MetadataStoresExecution,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          NasJob,
          NotebookExecutionJob,
          NotebookRuntimeTemplate,
          OnlineEvaluator,
          PersistentResource,
          PipelineJob,
          RagCorpora,
          ReasoningEnginesMemory,
          AnalyticsDatastore,
          ApimServiceExtension,
          Apiproduct,
          ApiproductsRateplan,
          ApisKeyvaluemap,
          ApisKeyvaluemapsEntry,
          Appgroup,
          AppgroupsApp,
          EnvironmentsKeystore,
          EnvironmentsKeyvaluemap,
          EnvironmentsReference,
          EnvironmentsResourcefile,
          EnvironmentsSecurityAction,
          EnvironmentsTargetserver,
          InstancesAttachment,
          InstancesNatAddress,
          Keyvaluemap,
          KeyvaluemapsEntry,
          Organization,
          SecurityFeedback,
          SecurityProfilesV2,
          Sharedflow,
          SitesApicategory,
          SitesApidoc,
          Assignment,
          AndroidApp,
          SasportalCustomersDeploymentsDevice,
          SasportalCustomersNodesDeployment,
          SasportalCustomersNodesDevice,
          SasportalCustomersNodesNode,
          SasportalNodesDeploymentsDevice,
          SasportalNodesNodesDeployment,
          SasportalNodesNodesDevice,
          SasportalNodesNodesNode,
          SasportalSignedCustomersDevice,
          SasportalSignedCustomersNodesDevice,
          SasportalSignedNodesDevice,
          SasportalSignedNodesNodesDevice,
          ScanConfig,
          FeaturestoresEntityTypesFeature,
          ModelDeploymentMonitoringJob,
          FeatureOnlineStoresFeatureView,
          EnvironmentsKeystoresAlias,
          EnvironmentsKeyvaluemapsEntry,
          SecurityMonitoringCondition,
          EnvironmentsArchiveDeployment,
          EnvironmentsTraceConfigOverride,
          EnvironmentsApisRevisionsDebugsession,
          IamPolicy,
          HostServiceAccount,
          IamMember,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      Object.assign(
        merged,
        (yield* Provider.collection([
          SasportalSignedCustomersDeploymentsDevice,
          SasportalSignedNodesDeploymentsDevice,
          JobTemplate,
          IamServiceAccount,
          IamServiceAccountKey,
          WorkloadIdentityPool,
          WorkloadIdentityProvider,
          ProjectService,
        ]) as unknown as Effect.Effect<{ providers: Record<string, any> }, never, never>).providers,
      );
      return {
        kind: "ProviderCollection" as const,
        get: (service: string) => merged[service],
        providers: merged,
      };
    }),
  ).pipe(
    Layer.provide(
      Layer.mergeAll(
        Layer.mergeAll(
          Layer.mergeAll(
            BucketProvider(),
            NotificationProvider(),
            TopicProvider(),
            SubscriptionProvider(),
            SchemaProvider(),
            PubSubSnapshotProvider(),
            Layer.mergeAll(
              KeyRingProvider(),
              CryptoKeyProvider(),
              CryptoKeyVersionProvider(),
              ImportJobProvider(),
              SingleTenantHsmInstanceProposalProvider(),
            ),
            SinkProvider(),
            MetricProvider(),
            Layer.mergeAll(SecretProvider(), LocationsSecretProvider()),
            Layer.mergeAll(ParameterProvider(), ParametersVersionProvider()),
            CertificateProvider(),
            CertificateMapProvider(),
            CertificateMapEntryProvider(),
            DnsAuthorizationProvider(),
            TrustConfigProvider(),
            CertificateIssuanceConfigProvider(),
            DatasetProvider(),
            TableProvider(),
          ),
          Layer.mergeAll(
            BucketAccessControlProvider(),
            DefaultObjectAccessControlProvider(),
            FolderProvider(),
            ManagedProvider(),
            ObjectAccessControlProvider(),
            StorageObjectProvider(),
            AgentPoolProvider(),
            TransferJobProvider(),
          ),
        ),
        Layer.mergeAll(
          FunctionProvider(),
          RoutineProvider(),
          HmacKeyProvider(),
          Layer.mergeAll(
            DatabaseProvider(),
            DatabasesBackupScheduleProvider(),
            DatabasesCollectionGroupsIndexProvider(),
            DatabasesUserCredProvider(),
            DatastoreIndexProvider(),
          ),
          Layer.mergeAll(RedisInstanceProvider(), AclPolicyProvider()),
          MemcacheInstanceProvider(),
          Layer.mergeAll(MlModelProvider(), ModelsVersionProvider()),
          Layer.mergeAll(
            FilestoreInstanceProvider(),
            FilestoreBackupProvider(),
            FilestoreInstancesSnapshotProvider(),
            TpuNodeProvider(),
            TpuQueuedResourceProvider(),
          ),
          Layer.mergeAll(ClusterProvider(), NodePoolProvider(), ClustersNodePoolProvider()),
          Layer.mergeAll(
            SqlInstanceProvider(),
            SqlDatabaseProvider(),
            SqlSslCertProvider(),
            SqlUserProvider(),
            SqlBackupBackupProvider(),
            SqlBackupRunProvider(),
          ),
          RepositoryProvider(),
          QueueProvider(),
          JobProvider(),
          CloudRunJobProvider(),
          RunContainerProvider(),
          ServiceProvider(),
          WebsiteServerProvider(),
          WorkerPoolProvider(),
        ),
        Layer.mergeAll(
          ManagedZoneProvider(),
          ResourceRecordSetProvider(),
          DnsPolicyProvider(),
          ResponsePolicyProvider(),
          ResponsePolicyRuleProvider(),
          RepositoriesAttachmentProvider(),
          RepositoriesPackagesTagProvider(),
          RepositoriesRuleProvider(),
          BigQueryJobProvider(),
          RowAccessPolicyProvider(),
          DataPolicyProvider(),
        ),
        Layer.mergeAll(
          AddressProvider(),
          BackendBucketProvider(),
          BackendServiceProvider(),
          HealthCheckProvider(),
          ImageProvider(),
          MachineImageProvider(),
          InstanceProvider(),
          InstanceGroupProvider(),
          InstanceGroupManagerProvider(),
          AutoscalerProvider(),
          RegionAutoscalerProvider(),
          InstanceTemplateProvider(),
          RegionInstanceGroupManagerProvider(),
          NetworkProvider(),
          NetworkEndpointGroupProvider(),
          SubnetworkProvider(),
          DiskProvider(),
          GlobalAddressProvider(),
          RegionNetworkEndpointGroupProvider(),
        ),
        Layer.mergeAll(
          SnapshotProvider(),
          RegionDiskProvider(),
          RouteProvider(),
          RegionBackendServiceProvider(),
          RegionHealthCheckProvider(),
          HttpHealthCheckProvider(),
          ResourcePolicyProvider(),
          SecurityPolicyProvider(),
          ServiceAttachmentProvider(),
          RouterProvider(),
          FirewallProvider(),
          FirewallPolicyProvider(),
          ForwardingRuleProvider(),
          UrlMapProvider(),
          RegionUrlMapProvider(),
          TargetHttpProxyProvider(),
          RegionTargetHttpProxyProvider(),
          TargetHttpsProxyProvider(),
          TargetInstanceProvider(),
        ),
        Layer.mergeAll(
          TargetPoolProvider(),
          HttpsHealthCheckProvider(),
          InstantSnapshotProvider(),
          InstantSnapshotGroupProvider(),
          CrossSiteNetworkProvider(),
          FutureReservationProvider(),
          GlobalPublicDelegatedPrefixProvider(),
          GlobalVmExtensionPolicyProvider(),
          InstanceGroupManagerResizeRequestProvider(),
          GlobalNetworkEndpointGroupProvider(),
        ),
        Layer.mergeAll(
          OrganizationSecurityPolicyProvider(),
          PublicAdvertisedPrefixProvider(),
          PublicDelegatedPrefixProvider(),
          RegionBackendBucketProvider(),
          RegionCompositeHealthCheckProvider(),
          RegionHealthAggregationPolicyProvider(),
          RegionHealthCheckServiceProvider(),
          RegionHealthSourceProvider(),
          RegionInstanceGroupManagerResizeRequestProvider(),
          RegionInstanceTemplateProvider(),
        ),
        Layer.mergeAll(
          RegionSslCertificateProvider(),
          RegionSslPolicyProvider(),
          RegionNetworkFirewallPolicyProvider(),
          RegionNotificationEndpointProvider(),
          RegionSecurityPolicyProvider(),
          RegionSnapshotProvider(),
          RegionInstantSnapshotProvider(),
          RegionInstantSnapshotGroupProvider(),
          RegionTargetHttpsProxyProvider(),
          RegionTargetTcpProxyProvider(),
        ),
        Layer.mergeAll(
          TargetSslProxyProvider(),
          TargetTcpProxyProvider(),
          TargetGrpcProxyProvider(),
          GlobalForwardingRuleProvider(),
          SslCertificateProvider(),
          SslPolicyProvider(),
          VpnGatewayProvider(),
          TargetVpnGatewayProvider(),
          ExternalVpnGatewayProvider(),
          VpnTunnelProvider(),
          PacketMirroringProvider(),
          ConnectorProvider(),
          WorkflowProvider(),
          TriggerProvider(),
          ChannelProvider(),
          NamespaceProvider(),
          TagKeyProvider(),
          TagValueProvider(),
          TagBindingProvider(),
        ),
        Layer.mergeAll(
          MessageBusProvider(),
          PipelineProvider(),
          EnrollmentProvider(),
          GoogleApiSourceProvider(),
          ChannelConnectionProvider(),
          ResourceManagerFolderProvider(),
          LienProvider(),
          ResourceManagerProjectProvider(),
        ),
        Layer.mergeAll(
          ConnectionProvider(),
          CloudBuildConnectionProvider(),
          CloudBuildRepositoryProvider(),
          ServiceDirectoryServiceProvider(),
          ServiceDirectoryEndpointProvider(),
          CaPoolProvider(),
          CertificateAuthorityProvider(),
          CertificateTemplateProvider(),
          PolicyProvider(),
          HubProvider(),
          SpokeProvider(),
          InternalRangeProvider(),
          PolicyBasedRouteProvider(),
          TransferConfigProvider(),
          ComposerEnvironmentProvider(),
          ReservationProvider(),
          DataprocClusterProvider(),
          BigtableInstanceProvider(),
          BigtableAppProfileProvider(),
        ),
        Layer.mergeAll(ServicemanagementServiceProvider()),
        Layer.mergeAll(
          EnvironmentsUserWorkloadsConfigMapProvider(),
          EnvironmentsUserWorkloadsSecretProvider(),
          CustomConstraintProvider(),
        ),
        Layer.mergeAll(CapacityCommitmentProvider(), ReservationGroupProvider()),
        Layer.mergeAll(
          DataprocAutoscalingPolicyProvider(),
          DataprocBatcheProvider(),
          DataprocRegionsAutoscalingPolicyProvider(),
          DataprocRegionsWorkflowTemplateProvider(),
          DataprocSessionProvider(),
          DataprocSessionTemplateProvider(),
          DataprocWorkflowTemplateProvider(),
        ),
        Layer.mergeAll(
          BigtableInstancesClustersBackupProvider(),
          BigtableInstancesLogicalViewProvider(),
          BigtableInstancesMaterializedViewProvider(),
          BigtableInstancesTablesAuthorizedViewProvider(),
          BigtableInstancesTablesSchemaBundleProvider(),
        ),
        Layer.mergeAll(
          Layer.mergeAll(
            TransportProvider(),
            AutomatedDnsRecordProvider(),
            MulticloudDataTransferConfigProvider(),
            MulticloudDataTransferConfigsDestinationProvider(),
            RegionalEndpointProvider(),
            ServiceConnectionMapProvider(),
            ServiceConnectionPolicyProvider(),
            ServiceConnectionTokenProvider(),
            SpokesGatewayAdvertisedRouteProvider(),
          ),
          Layer.mergeAll(
            VpcFlowLogsConfigProvider(),
            OrganizationsVpcFlowLogsConfigProvider(),
            ConnectivityTestProvider(),
            NetworkMonitoringProviderProvider(),
          ),
          Layer.mergeAll(
            KeyProvider(),
            AlloyDbClusterProvider(),
            AlloyDbInstanceProvider(),
            LogBucketProvider(),
            ExclusionProvider(),
            BucketsViewProvider(),
            BucketsLinkProvider(),
            LogScopeProvider(),
            SavedQueryProvider(),
            SpannerInstanceProvider(),
            SpannerDatabaseProvider(),
            BigQueryConnectionProvider(),
            AlertPolicyProvider(),
            NotificationChannelProvider(),
            UptimeCheckConfigProvider(),
            BigtableClusterProvider(),
            BigtableTableProvider(),
          ),
          Layer.mergeAll(
            SpannerInstanceConfigProvider(),
            SpannerInstancesBackupProvider(),
            SpannerInstancesDatabasesBackupScheduleProvider(),
            SpannerInstancesInstancePartitionProvider(),
            AlloyDbBackupProvider(),
            AlloyDbClustersUserProvider(),
          ),
          Layer.mergeAll(
            MonitoringGroupProvider(),
            MetricDescriptorProvider(),
            MonitoringServiceProvider(),
            ServicesServiceLevelObjectiveProvider(),
            TraceScopeProvider(),
            BucketsDatasetsLinkProvider(),
          ),
          Layer.mergeAll(
            BillingExclusionProvider(),
            BillingBucketProvider(),
            BillingBucketsLinkProvider(),
            BillingBucketsViewProvider(),
            BillingSavedQueryProvider(),
            BillingSinkProvider(),
            FolderExclusionProvider(),
            FolderBucketProvider(),
            FolderBucketsLinkProvider(),
            FolderBucketsViewProvider(),
            FolderLogScopeProvider(),
            FolderSavedQueryProvider(),
            FolderSinkProvider(),
            LocationsBucketProvider(),
            LocationsBucketsLinkProvider(),
            LocationsBucketsViewProvider(),
          ),
          Layer.mergeAll(
            OrganizationExclusionProvider(),
            OrganizationLogBucketProvider(),
            OrganizationBucketsLinkProvider(),
            OrganizationBucketsViewProvider(),
            OrganizationLogScopeProvider(),
            OrganizationSavedQueryProvider(),
            OrganizationSinkProvider(),
          ),
          Layer.mergeAll(
            ComputeReservationProvider(),
            RolloutPlanProvider(),
            StoragePoolProvider(),
            WireGroupProvider(),
            ZoneVmExtensionPolicyProvider(),
            GoldengateDeploymentProvider(),
            OdbNetworkProvider(),
            OdbNetworksOdbSubnetProvider(),
            AutonomousDatabaseProvider(),
            CloudExadataInfrastructureProvider(),
            CloudVmClusterProvider(),
            DbSystemProvider(),
            ExadbVmClusterProvider(),
            ExascaleDbStorageVaultProvider(),
            GoldengateConnectionProvider(),
            GoldengateConnectionAssignmentProvider(),
          ),
          Layer.mergeAll(
            InterconnectProvider(),
            InterconnectAttachmentProvider(),
            InterconnectGroupProvider(),
            InterconnectAttachmentGroupProvider(),
            LicenseProvider(),
            NetworkAttachmentProvider(),
            NetworkEdgeSecurityServiceProvider(),
            NetworkFirewallPolicyProvider(),
            NodeGroupProvider(),
            NodeTemplateProvider(),
          ),
          Layer.mergeAll(
            TrainingPipelineProvider(),
            AIPlatformDatasetProvider(),
            DatasetsDatasetVersionProvider(),
            ReasoningEngineProvider(),
            ReasoningEnginesSandboxEnvironmentTemplateProvider(),
            ReasoningEnginesSandboxEnvironmentProvider(),
          ),
          Layer.mergeAll(
            ReasoningEnginesSessionProvider(),
            ScheduleProvider(),
            SemanticGovernancePolicyProvider(),
            SpecialistPoolProvider(),
            StudyProvider(),
            StudiesTrialProvider(),
            TensorboardProvider(),
            TensorboardsExperimentProvider(),
            TensorboardsExperimentsRunProvider(),
            TensorboardsExperimentsRunsTimeSeriesProvider(),
          ),
          Layer.mergeAll(
            AppgroupsAppsKeyProvider(),
            DatacollectorProvider(),
            DeveloperProvider(),
            DevelopersAppProvider(),
            DevelopersAppsKeyProvider(),
            DnsZoneProvider(),
            EndpointAttachmentProvider(),
            EnvgroupProvider(),
            EnvgroupsAttachmentProvider(),
            ApigeeEnvironmentProvider(),
          ),
          Layer.mergeAll(
            ClientTlsPolicyProvider(),
            DnsThreatDetectorProvider(),
            FirewallEndpointProvider(),
            FirewallEndpointAssociationProvider(),
            GatewaySecurityPolicyProvider(),
            GatewaySecurityPoliciesRuleProvider(),
            InterceptDeploymentGroupProvider(),
            InterceptDeploymentProvider(),
          ),
          Layer.mergeAll(
            InterceptEndpointGroupProvider(),
            InterceptEndpointGroupAssociationProvider(),
            MirroringDeploymentGroupProvider(),
            MirroringDeploymentProvider(),
            MirroringEndpointGroupProvider(),
            MirroringEndpointGroupAssociationProvider(),
            SacRealmProvider(),
            SacAttachmentProvider(),
          ),
          Layer.mergeAll(
            SecurityProfileProvider(),
            SecurityProfileGroupProvider(),
            ServerTlsPolicyProvider(),
            TlsInspectionPolicyProvider(),
            UrlListProvider(),
          ),
          Layer.mergeAll(
            AddressGroupProvider(),
            AuthorizationPolicyProvider(),
            AuthzPolicyProvider(),
            BackendAuthenticationConfigProvider(),
            OrganizationsAddressGroupProvider(),
            OrganizationsFirewallEndpointProvider(),
            OrganizationsSecurityProfileProvider(),
            OrganizationsSecurityProfileGroupProvider(),
          ),
        ),
        Layer.mergeAll(
          Layer.mergeAll(
            Layer.mergeAll(
              AgentGatewayProvider(),
              AuthzExtensionProvider(),
              EndpointPolicyProvider(),
              NetworkservicesGatewayProvider(),
              GrpcRouteProvider(),
              HttpRouteProvider(),
              LbEdgeExtensionProvider(),
              LbRouteExtensionProvider(),
              WasmPluginProvider(),
              WasmPluginsVersionProvider(),
            ),
            Layer.mergeAll(
              LbTrafficExtensionProvider(),
              MeshProvider(),
              MulticastConsumerAssociationProvider(),
              MulticastGroupConsumerActivationProvider(),
              ServiceBindingProvider(),
              ServiceLbPolicyProvider(),
              TcpRouteProvider(),
              TlsRouteProvider(),
            ),
          ),
          Layer.mergeAll(
            AspectTypeProvider(),
            DataDomainProvider(),
            DataDomainsBindingProvider(),
            DataProductProvider(),
            DataProductsDataAssetProvider(),
            DataScanProvider(),
            EncryptionConfigProvider(),
          ),
          Layer.mergeAll(
            EntryGroupProvider(),
            EntryGroupsEntryProvider(),
            EntryGroupsEntryLinkProvider(),
            EntryTypeProvider(),
            GlossaryProvider(),
            GlossariesCategoryProvider(),
          ),
          Layer.mergeAll(
            GlossariesTermProvider(),
            LakeProvider(),
            LakesTaskProvider(),
            LakesZoneProvider(),
            LakesAssetProvider(),
            LakesEntityProvider(),
            LakesEntitiesPartitionProvider(),
            MetadataFeedProvider(),
          ),
          Layer.mergeAll(TagTemplateProvider(), TaxonomyProvider(), TaxonomiesPolicyTagProvider()),
          Layer.mergeAll(
            DataStoresBranchesDocumentProvider(),
            DataStoresControlProvider(),
            DataStoresConversationProvider(),
            DataStoresSchemaProvider(),
            DataStoresServingConfigProvider(),
            DataStoresSessionProvider(),
            DataStoresSiteSearchEngineTargetSiteProvider(),
            IdentityMappingStoreProvider(),
          ),
          Layer.mergeAll(
            DataStoreProvider(),
            CollectionsEngineProvider(),
            CollectionsEnginesAssistantProvider(),
            CollectionsEnginesAssistantsAgentsA2aV1TasksPushNotificationConfigProvider(),
            CollectionsEnginesControlProvider(),
            CollectionsEnginesConversationProvider(),
            CollectionsEnginesServingConfigProvider(),
            CollectionsEnginesSessionProvider(),
          ),
          Layer.mergeAll(
            CollectionsDataStoreProvider(),
            CollectionsDataStoresBranchesDocumentProvider(),
            CollectionsDataStoresControlProvider(),
            CollectionsDataStoresConversationProvider(),
            CollectionsDataStoresSchemaProvider(),
            CollectionsDataStoresServingConfigProvider(),
            CollectionsDataStoresSessionProvider(),
            CollectionsDataStoresSiteSearchEngineTargetSiteProvider(),
          ),
          Layer.mergeAll(
            Layer.mergeAll(
              AnalysisRuleProvider(),
              AssessmentRuleProvider(),
              AuthorizedViewSetProvider(),
              AuthorizedViewSetsAuthorizedViewProvider(),
              AuthorizedViewSetsAuthorizedViewsConversationsAssessmentProvider(),
              AuthorizedViewSetsAuthorizedViewsConversationsFeedbackLabelProvider(),
              AutoLabelingRuleProvider(),
              ConversationProvider(),
              ConversationsAnalysesProvider(),
              ConversationsAssessmentProvider(),
              ConversationsFeedbackLabelProvider(),
              DashboardProvider(),
              DashboardsChartProvider(),
              DatasetsConversationsFeedbackLabelProvider(),
              IssueModelProvider(),
              IssueModelsIssueProvider(),
            ),
            Layer.mergeAll(
              PhraseMatcherProvider(),
              QaQuestionTagProvider(),
              QaScorecardProvider(),
              QaScorecardsRevisionProvider(),
              QaScorecardsRevisionsQaQuestionProvider(),
              ViewProvider(),
            ),
            ContactCenterProvider(),
          ),
          Layer.mergeAll(
            Layer.mergeAll(
              AgentsEntityTypeProvider(),
              AgentsEnvironmentProvider(),
              AgentsEnvironmentsExperimentProvider(),
              AgentsEnvironmentsSessionsEntityTypeProvider(),
              AgentsFlowProvider(),
              AgentsFlowsPageProvider(),
              AgentsFlowsTransitionRouteGroupProvider(),
              AgentsFlowsVersionProvider(),
            ),
            Layer.mergeAll(
              AgentsGeneratorProvider(),
              AgentsIntentProvider(),
              AgentsPlaybookProvider(),
              AgentsPlaybooksExampleProvider(),
              AgentsPlaybooksVersionProvider(),
              AgentsSessionsEntityTypeProvider(),
              AgentsToolProvider(),
              AgentsToolsVersionProvider(),
            ),
            Layer.mergeAll(
              AgentsTransitionRouteGroupProvider(),
              AgentsWebhookProvider(),
              SecuritySettingProvider(),
            ),
          ),
          Layer.mergeAll(
            OrganizationStoredInfoTypeProvider(),
            DeidentifyTemplateProvider(),
            DlpJobProvider(),
            InspectTemplateProvider(),
            JobTriggerProvider(),
            ContentPolicyProvider(),
            LocationsDeidentifyTemplateProvider(),
            LocationsDlpJobProvider(),
            LocationsInspectTemplateProvider(),
            LocationsJobTriggerProvider(),
            LocationsStoredInfoTypeProvider(),
            StoredInfoTypeProvider(),
            DiscoveryConfigProvider(),
          ),
          Layer.mergeAll(
            Layer.mergeAll(
              OrganizationsDeidentifyTemplateProvider(),
              OrganizationsInspectTemplateProvider(),
              OrganizationsLocationsConnectionProvider(),
              OrganizationsLocationsDeidentifyTemplateProvider(),
              OrganizationsLocationsDiscoveryConfigProvider(),
              OrganizationsLocationsInspectTemplateProvider(),
              OrganizationsLocationsJobTriggerProvider(),
              OrganizationsLocationsStoredInfoTypeProvider(),
            ),
            Layer.mergeAll(
              FolderBigQueryExportProvider(),
              FolderEventThreatDetectionSettingsCustomModuleProvider(),
              FolderMuteConfigProvider(),
              FolderNotificationConfigProvider(),
              FolderSecurityHealthAnalyticsSettingsCustomModuleProvider(),
              OrganizationBigQueryExportProvider(),
              OrganizationEventThreatDetectionSettingsCustomModuleProvider(),
              OrganizationMuteConfigProvider(),
              NotificationConfigProvider(),
              OrganizationsNotificationConfigProvider(),
              MuteConfigProvider(),
              BigQueryExportProvider(),
              EventThreatDetectionSettingsCustomModuleProvider(),
              SecurityHealthAnalyticsSettingsCustomModuleProvider(),
              OrganizationsSecurityHealthAnalyticsSettingsCustomModuleProvider(),
            ),
          ),
          Layer.mergeAll(PostureProvider(), PostureDeploymentProvider()),
          Layer.mergeAll(
            GmailpostmastertoolsDomainProvider(),
            DomainsUserProvider(),
            SettingsDatasourceProvider(),
            SettingsSearchapplicationProvider(),
            MonetizationSubscriptionProvider(),
            MonetizationSubscriptionsBasePlansOfferProvider(),
            EditProvider(),
            InappproductProvider(),
          ),
          Layer.mergeAll(AchievementConfigurationProvider(), LeaderboardConfigurationProvider()),
        ),
        Layer.mergeAll(
          Layer.mergeAll(
            MatterProvider(),
            MattersExportProvider(),
            MattersHoldProvider(),
            MattersSavedQueryProvider(),
          ),
          Layer.mergeAll(
            StorelayoutclusterProvider(),
            StorelayoutpageProvider(),
            WebappProvider(),
            AndroidmanagementEnterpriseProvider(),
            EnterprisesEnrollmentTokenProvider(),
            EnterprisesWebAppProvider(),
            CustomersConfigurationProvider(),
            CustomersConnectorConfigProvider(),
          ),
          Layer.mergeAll(WorkspaceeventsSubscriptionProvider(), SupportEventSubscriptionProvider()),
          Layer.mergeAll(
            JobsTenantProvider(),
            TenantsCompanyProvider(),
            TenantsJobProvider(),
            VisionProductSetProvider(),
            VisionProductProvider(),
            ProductsReferenceImageProvider(),
            CustomClassProvider(),
            PhraseSetProvider(),
          ),
          Layer.mergeAll(
            AppsAuthorizedCertificateProvider(),
            AppsDomainMappingProvider(),
            AppsFirewallIngressRuleProvider(),
            AppsServicesVersionProvider(),
            ApplicationsAuthorizedCertificateProvider(),
            ApplicationsDomainMappingProvider(),
          ),
          Layer.mergeAll(
            EssentialcontactsContactProvider(),
            FolderContactProvider(),
            OrganizationContactProvider(),
          ),
          Layer.mergeAll(UsersSshPublicKeyProvider()),
          Layer.mergeAll(LicenseAssignmentProvider()),
          Layer.mergeAll(WebResourceProvider()),
        ),
        Layer.mergeAll(
          Layer.mergeAll(CloudassetFeedProvider(), CloudassetSavedQueryProvider()),
          Layer.mergeAll(
            CloudidentityDeviceProvider(),
            CloudidentityGroupProvider(),
            GroupsMembershipProvider(),
            InboundOidcSsoProfileProvider(),
            InboundSamlSsoProfileProvider(),
            InboundSsoAssignmentProvider(),
          ),
          Layer.mergeAll(
            CloudchannelCustomerProvider(),
            ChannelPartnerLinksCustomerProvider(),
            CustomersCustomerRepricingConfigProvider(),
            ChannelPartnerLinksChannelPartnerRepricingConfigProvider(),
          ),
          Layer.mergeAll(
            CloudcontrolspartnerCustomerProvider(),
            DeploymentmanagerDeploymentProvider(),
          ),
          Layer.mergeAll(
            BackupChannelProvider(),
            BackupPlanProvider(),
            BackupPlansBackupProvider(),
            RestoreChannelProvider(),
            RestorePlanProvider(),
            RestorePlansRestoreProvider(),
          ),
          Layer.mergeAll(MembershipsFeatureProvider()),
          Layer.mergeAll(InstancesBackupProvider(), JobTemplateProvider()),
          Layer.mergeAll(
            BareMetalClusterProvider(),
            BareMetalClustersBareMetalNodePoolProvider(),
            GkeonpremVmwareClusterProvider(),
            VmwareClustersVmwareNodePoolProvider(),
          ),
          Layer.mergeAll(
            BackupdrBackupVaultProvider(),
            BackupdrBackupPlanProvider(),
            BackupPlanAssociationProvider(),
            BackupdrManagementServerProvider(),
            BaremetalsolutionNfsShareProvider(),
            BaremetalsolutionVolumesSnapshotProvider(),
          ),
          Layer.mergeAll(
            ManagedidentitiesDomainProvider(),
            ManagedidentitiesDomainsBackupProvider(),
            ManagedidentitiesPeeringProvider(),
          ),
          Layer.mergeAll(
            CustomTargetTypeProvider(),
            DeliveryPipelineProvider(),
            DeliveryPipelinesAutomationProvider(),
            DeployPolicyProvider(),
            ClouddeployTargetProvider(),
          ),
          Layer.mergeAll(ConfigDeploymentGroupProvider(), ConfigPreviewProvider()),
          Layer.mergeAll(
            FirebaseapphostingBackendProvider(),
            BackendsBuildProvider(),
            BackendsDomainProvider(),
            AppsDebugTokenProvider(),
            ServicesResourcePolicyProvider(),
            FirebaseappdistributionGroupProvider(),
          ),
          Layer.mergeAll(
            FirebasedataconnectServiceProvider(),
            ServicesSchemaProvider(),
            ServicesConnectorProvider(),
          ),
          Layer.mergeAll(FirebaserulesRulesetProvider(), FirebaserulesReleaseProvider()),
        ),
        Layer.mergeAll(
          Layer.mergeAll(
            HealthcareDatasetProvider(),
            DatasetsConsentStoreProvider(),
            DatasetsConsentStoresAttributeDefinitionProvider(),
            DatasetsConsentStoresConsentProvider(),
            DatasetsConsentStoresConsentArtifactProvider(),
            DatasetsConsentStoresUserDataMappingProvider(),
            DatasetsDicomStoreProvider(),
            DatasetsFhirStoreProvider(),
            DatasetsHl7V2StoreProvider(),
            DatasetsHl7V2StoresMessageProvider(),
          ),
          Layer.mergeAll(BrandsIdentityAwareProxyClientProvider(), IapDestGroupProvider()),
          Layer.mergeAll(
            CesAppProvider(),
            AppsAgentProvider(),
            AppsDeploymentProvider(),
            AppsExampleProvider(),
            AppsGuardrailProvider(),
            AppsToolProvider(),
            AppsToolsetProvider(),
            AppsVersionProvider(),
          ),
          Layer.mergeAll(
            SasportalCustomersDeploymentProvider(),
            SasportalCustomersDeviceProvider(),
            SasportalCustomersNodeProvider(),
            SasportalNodesDeviceProvider(),
            SasportalNodesNodeProvider(),
          ),
          Layer.mergeAll(
            DatalabelingAnnotationSpecSetProvider(),
            DatalabelingDatasetProvider(),
            DatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessageProvider(),
            DatalabelingEvaluationJobProvider(),
            DatalabelingInstructionProvider(),
          ),
          Layer.mergeAll(
            ProcessProvider(),
            ProcessesRunProvider(),
            ProcessesRunsLineageEventProvider(),
          ),
          Layer.mergeAll(
            SaasservicemgmtSaaProvider(),
            SaasservicemgmtTenantProvider(),
            SaasservicemgmtUnitKindProvider(),
            SaasservicemgmtUnitProvider(),
            SaasservicemgmtReleaseProvider(),
            SaasservicemgmtRolloutKindProvider(),
            SaasservicemgmtRolloutProvider(),
            SaasservicemgmtUnitOperationProvider(),
          ),
          Layer.mergeAll(
            RegistryBookProvider(),
            RealmProvider(),
            CustomRangeProvider(),
            IpamAdminScopeProvider(),
          ),
          Layer.mergeAll(
            AdminReservationProvider(),
            AdminTopicProvider(),
            AdminSubscriptionProvider(),
          ),
          Layer.mergeAll(
            NetappActiveDirectoryProvider(),
            NetappBackupPolicyProvider(),
            NetappBackupVaultProvider(),
            NetappBackupVaultsBackupProvider(),
            NetappHostGroupProvider(),
            NetappKmsConfigProvider(),
            NetappStoragePoolProvider(),
            NetappVolumeProvider(),
            NetappVolumesQuotaRuleProvider(),
          ),
          Layer.mergeAll(VolumesSnapshotProvider(), VolumesReplicationProvider()),
          Layer.mergeAll(
            CatalogsBranchesProductProvider(),
            CatalogsControlProvider(),
            CatalogsModelProvider(),
            CatalogsServingConfigProvider(),
          ),
          Layer.mergeAll(CatalogsCatalogItemProvider()),
          Layer.mergeAll(
            Layer.mergeAll(
              Layer.mergeAll(
                ApihubDeploymentProvider(),
                ExternalApiProvider(),
                PluginProvider(),
                PluginsInstanceProvider(),
                RuntimeProjectAttachmentProvider(),
                ApiHubInstanceProvider(),
                ApihubApiProvider(),
                ApisVersionProvider(),
              ),
              Layer.mergeAll(
                ApisVersionsOperationProvider(),
                ApisVersionsSpecProvider(),
                ApihubAttributeProvider(),
                CurationProvider(),
                DependencyProvider(),
              ),
              Layer.mergeAll(
                ApplicationProvider(),
                ApplicationsServiceProvider(),
                ApplicationsWorkloadProvider(),
                ServiceProjectAttachmentProvider(),
                ObservationJobProvider(),
                ObservationSourceProvider(),
                ApisConfigProvider(),
              ),
              Layer.mergeAll(
                MerchantReviewProvider(),
                ProductReviewProvider(),
                ContentwarehouseDocumentSchemaProvider(),
                ContentwarehouseDocumentProvider(),
                ContentwarehouseRuleSetProvider(),
                ContentwarehouseSynonymSetProvider(),
              ),
              Layer.mergeAll(
                SfdcInstanceProvider(),
                SfdcInstancesSfdcChannelProvider(),
                IntegrationsTemplateProvider(),
                AuthConfigProvider(),
                IntegrationsVersionProvider(),
                IntegrationsVersionsTestCasesProvider(),
                ProductsAuthConfigProvider(),
                ProductsCertificateProvider(),
                ProductsIntegrationsVersionProvider(),
                ProductsSfdcInstanceProvider(),
                ProductsSfdcInstancesSfdcChannelProvider(),
              ),
              Layer.mergeAll(
                MigrationcenterSourceProvider(),
                MigrationcenterAssetsExportJobProvider(),
                MigrationcenterDiscoveryClientProvider(),
                MigrationcenterGroupProvider(),
                MigrationcenterImportJobProvider(),
                MigrationcenterImportJobsImportDataFileProvider(),
                MigrationcenterPreferenceSetProvider(),
                MigrationcenterReportConfigProvider(),
                MigrationcenterReportConfigsReportProvider(),
                RapidmigrationassessmentCollectorProvider(),
                MetastoreFederationProvider(),
                MetastoreServiceProvider(),
                MetastoreServicesBackupProvider(),
              ),
              Layer.mergeAll(
                DataformRepositoryProvider(),
                ProjectsLocationsFolderProvider(),
                RepositoriesReleaseConfigProvider(),
                RepositoriesWorkflowConfigProvider(),
                RepositoriesWorkflowInvocationProvider(),
                RepositoriesWorkspaceProvider(),
                TeamProvider(),
              ),
              Layer.mergeAll(
                VmwareEngineNetworkProvider(),
                PrivateConnectionProvider(),
                PrivateCloudsManagementDnsZoneBindingProvider(),
                VmwareengineDatastoreProvider(),
                NetworkPeeringProvider(),
                VmwareengineNetworkPolicyProvider(),
                NetworkPoliciesExternalAccessRuleProvider(),
                PrivateCloudProvider(),
                PrivateCloudsClusterProvider(),
                PrivateCloudsExternalAddressProvider(),
                PrivateCloudsLoggingServerProvider(),
              ),
              Layer.mergeAll(
                DataExchangeProvider(),
                DataExchangesListingProvider(),
                DataExchangesQueryTemplateProvider(),
              ),
              Layer.mergeAll(
                ContaineranalysisNoteProvider(),
                ContaineranalysisOccurrenceProvider(),
                LocationsNoteProvider(),
                LocationsOccurrenceProvider(),
                BinaryauthorizationAttestorProvider(),
                PlatformsPolicyProvider(),
                BlockchainNodeProvider(),
                BillingBudgetProvider(),
              ),
              Layer.mergeAll(
                AccessPolicyProvider(),
                AccessPoliciesAccessLevelProvider(),
                AccessPoliciesAuthorizedOrgsDescProvider(),
                AccessPoliciesServicePerimeterProvider(),
                GcpUserAccessBindingProvider(),
              ),
              Layer.mergeAll(
                VmmigrationGroupProvider(),
                VmmigrationImageImportProvider(),
                VmmigrationSourceProvider(),
                SourcesDatacenterConnectorProvider(),
                SourcesDiskMigrationJobProvider(),
                SourcesMigratingVmProvider(),
                SourcesUtilizationReportProvider(),
                VmmigrationTargetProvider(),
                DatamigrationConnectionProfileProvider(),
                DatamigrationConversionWorkspaceProvider(),
                ConversionWorkspacesMappingRuleProvider(),
                DatamigrationMigrationJobProvider(),
                DatamigrationPrivateConnectionProvider(),
              ),
              Layer.mergeAll(
                DatastreamConnectionProfileProvider(),
                DatastreamPrivateConnectionProvider(),
                PrivateConnectionsRouteProvider(),
                DatastreamStreamProvider(),
              ),
            ),
            Layer.mergeAll(
              Layer.mergeAll(
                AccountConnectorProvider(),
                DeveloperconnectConnectionProvider(),
                ConnectionsGitRepositoryLinkProvider(),
                InsightsConfigProvider(),
              ),
              Layer.mergeAll(
                BiglakeCatalogProvider(),
                CatalogsDatabaseProvider(),
                CatalogsDatabasesTableProvider(),
              ),
              Layer.mergeAll(
                ManagedKafkaClusterProvider(),
                ClustersAclProvider(),
                ClustersTopicProvider(),
                ManagedKafkaConnectClusterProvider(),
                ConnectClustersConnectorProvider(),
                ManagedKafkaSchemaRegistryProvider(),
                SchemaRegistriesSubjectsVersionProvider(),
                SchemaRegistriesContextsSubjectsVersionProvider(),
              ),
              Layer.mergeAll(
                AppConnectionProvider(),
                AppConnectorProvider(),
                AppGatewayProvider(),
                SecurityGatewayProvider(),
                SecurityGatewaysApplicationProvider(),
              ),
              Layer.mergeAll(
                RepositoriesBranchRuleProvider(),
                RepositoriesHookProvider(),
                RepositoriesIssueProvider(),
                RepositoriesIssuesIssueCommentProvider(),
                RepositoriesPullRequestsPullRequestCommentProvider(),
                DocumentaiProcessorProvider(),
                DocumentaiSchemaProvider(),
                SchemasSchemaVersionProvider(),
                FoldersLocationsGlobalPolicyOrchestratorProvider(),
                OrganizationsLocationsGlobalPolicyOrchestratorProvider(),
                ProjectsLocationsGlobalPolicyOrchestratorProvider(),
                AdaptiveMtDatasetProvider(),
                GlossariesGlossaryEntryProvider(),
                TranslateModelProvider(),
              ),
              Layer.mergeAll(
                BuyersClientsUserProvider(),
                AccountTypesUserListProvider(),
                DatapipelinesPipelineProvider(),
                BiddersPretargetingConfigProvider(),
              ),
              Layer.mergeAll(AssuredworkloadsWorkloadProvider()),
              Layer.mergeAll(
                WorkstationClusterProvider(),
                WorkstationClustersWorkstationConfigProvider(),
                WorkstationClustersWorkstationConfigsWorkstationProvider(),
                AgentregistryBindingProvider(),
                RecaptchaenterpriseKeyProvider(),
                RecaptchaenterpriseFirewallpolicyProvider(),
                AgentidentityAuthProviderProvider(),
                WorkloadmanagerEvaluationProvider(),
                DeploymentsActuationProvider(),
                ConnectionsEntityTypesEntityProvider(),
              ),
              Layer.mergeAll(
                AgentProvider(),
                BatchPredictionJobProvider(),
                CachedContentProvider(),
                CustomJobProvider(),
                DataLabelingJobProvider(),
                DeploymentResourcePoolProvider(),
                EvaluationItemProvider(),
                EvaluationRunProvider(),
                EvaluationSetProvider(),
                FeatureGroupProvider(),
                FeatureGroupsFeatureProvider(),
                FeatureOnlineStoreProvider(),
                FeaturestoreProvider(),
                FeaturestoresEntityTypeProvider(),
                HyperparameterTuningJobProvider(),
                TuningJobProvider(),
                AIPlatformIndexProvider(),
              ),
              Layer.mergeAll(
                IndexEndpointProvider(),
                AIPlatformEndpointProvider(),
                MetadataStoreProvider(),
                MetadataStoresArtifactProvider(),
                MetadataStoresContextProvider(),
                MetadataStoresExecutionProvider(),
                NasJobProvider(),
                NotebookExecutionJobProvider(),
                NotebookRuntimeTemplateProvider(),
                OnlineEvaluatorProvider(),
                PersistentResourceProvider(),
                PipelineJobProvider(),
                RagCorporaProvider(),
                ReasoningEnginesMemoryProvider(),
                AnalyticsDatastoreProvider(),
                ApimServiceExtensionProvider(),
                ApiproductProvider(),
              ),
              Layer.mergeAll(
                ApiproductsRateplanProvider(),
                ApisKeyvaluemapProvider(),
                ApisKeyvaluemapsEntryProvider(),
                AppgroupProvider(),
                AppgroupsAppProvider(),
                EnvironmentsKeystoreProvider(),
                EnvironmentsKeyvaluemapProvider(),
                EnvironmentsReferenceProvider(),
                EnvironmentsResourcefileProvider(),
                EnvironmentsSecurityActionProvider(),
                EnvironmentsTargetserverProvider(),
                InstancesAttachmentProvider(),
                InstancesNatAddressProvider(),
                KeyvaluemapProvider(),
                KeyvaluemapsEntryProvider(),
                OrganizationProvider(),
              ),
              Layer.mergeAll(
                SecurityFeedbackProvider(),
                SecurityProfilesV2Provider(),
                SharedflowProvider(),
                SitesApicategoryProvider(),
                SitesApidocProvider(),
                AssignmentProvider(),
                AndroidAppProvider(),
              ),
              Layer.mergeAll(
                SasportalCustomersDeploymentsDeviceProvider(),
                SasportalCustomersNodesDeploymentProvider(),
                SasportalCustomersNodesDeviceProvider(),
                SasportalCustomersNodesNodeProvider(),
                SasportalNodesDeploymentsDeviceProvider(),
                SasportalNodesNodesDeploymentProvider(),
                SasportalNodesNodesDeviceProvider(),
              ),
              Layer.mergeAll(
                SasportalNodesNodesNodeProvider(),
                SasportalSignedCustomersDeviceProvider(),
                SasportalSignedCustomersNodesDeviceProvider(),
                SasportalSignedNodesDeviceProvider(),
                SasportalSignedNodesNodesDeviceProvider(),
                ScanConfigProvider(),
              ),
              Layer.mergeAll(
                FeaturestoresEntityTypesFeatureProvider(),
                ModelDeploymentMonitoringJobProvider(),
                FeatureOnlineStoresFeatureViewProvider(),
                EnvironmentsKeystoresAliasProvider(),
                EnvironmentsKeyvaluemapsEntryProvider(),
                SecurityMonitoringConditionProvider(),
                EnvironmentsArchiveDeploymentProvider(),
                EnvironmentsTraceConfigOverrideProvider(),
                EnvironmentsApisRevisionsDebugsessionProvider(),
                IamPolicyProvider(),
                HostServiceAccountProvider(),
                IamMemberProvider(),
                IamServiceAccountProvider(),
                IamServiceAccountKeyProvider(),
                WorkloadIdentityPoolProvider(),
                WorkloadIdentityProviderProvider(),
                ProjectServiceProvider(),
                SasportalSignedCustomersDeploymentsDeviceProvider(),
                SasportalSignedNodesDeploymentsDeviceProvider(),
              ),
            ),
          ),
        ).pipe(Layer.provide(gcpLive)),
      ),
    ),
    Layer.provideMerge(
      Layer.mergeAll(
        Layer.mergeAll(
          ListDockerImagesHttp,
          FetchCaCertsHttp,
          GetCertificateAuthorityHttp,
          InsertAllHttp,
          ListTabledataHttp,
          QueryHttp,
          StartManualRunsHttp,
          BigQueryGetConnectionHttp,
          CloudBuildAccessReadTokenHttp,
          CloudBuildAccessReadWriteTokenHttp,
          CloudBuildFetchGitRefsHttp,
          GenerateDownloadUrlHttp,
          GetFunctionHttp,
          PauseJobHttp,
          ResumeJobHttp,
          RunJobHttp,
        ),
        Layer.mergeAll(
          CreateTaskHttp,
          ExecuteAirflowCommandHttp,
          GetEnvironmentHttp,
          GetUserWorkloadsConfigMapHttp,
          GetUserWorkloadsSecretHttp,
          CloudRunRunJobHttp,
          GetServiceHttp,
          GetWorkerPoolHttp,
          GetClusterHttp,
          GetClustersNodePoolHttp,
          GetNodePoolHttp,
          GetNoteHttp,
          GetOccurrenceHttp,
          GetAttestorHttp,
          GetPlatformsPolicyHttp,
          ValidateAttestationHttp,
        ),
        Layer.mergeAll(
          EvaluateGkePolicyHttp,
          GetInstanceHttp,
          StartInstanceHttp,
          StopInstanceHttp,
          DeleteDocumentHttp,
          GetDocumentHttp,
          PatchDocumentHttp,
          ExchangeDebugTokenHttp,
          ExecuteGraphqlHttp,
          ExecuteGraphqlReadHttp,
          ExecuteMutationHttp,
          ExecuteQueryHttp,
          GetReleaseExecutableHttp,
          TestRulesetHttp,
          AcknowledgeHttp,
          GetSchemaHttp,
        ),
        Layer.mergeAll(
          PublishHttp,
          PullHttp,
          ValidateMessageHttp,
          CommitCursorHttp,
          ComputeHeadCursorHttp,
          GetPartitionsHttp,
          GetPubsubliteReservationHttp,
          GetPubsubliteSubscriptionHttp,
          GetPubsubliteTopicHttp,
          DecryptHttp,
          EncryptHttp,
          AccessSecretVersionHttp,
          AddSecretVersionHttp,
          GetParameterHttp,
          GetParameterVersionHttp,
          RenderParameterVersionHttp,
        ),
        Layer.mergeAll(
          DeleteObjectHttp,
          GetObjectHttp,
          PutObjectHttp,
          GetGoogleServiceAccountHttp,
          RunTransferJobHttp,
          GetAclPolicyHttp,
          GetAuthStringHttp,
          GetRedisInstanceHttp,
          ReadRedisHttp,
          ReadWriteRedisHttp,
          WriteRedisHttp,
          GetMemcacheInstanceHttp,
          GetMlModelHttp,
          GetMlVersionHttp,
          PredictMlHttp,
          GetFilestoreBackupHttp,
          GetFilestoreInstanceHttp,
          GetFilestoreInstancesSnapshotHttp,
        ),
        Layer.mergeAll(
          GetTpuNodeHttp,
          GetTpuQueuedResourceHttp,
          GetSpannerInstanceHttp,
          SpannerExecuteSqlHttp,
          SpannerGetDdlHttp,
          GetAlloyDbClusterHttp,
          GetAlloyDbConnectionInfoHttp,
          GetAlloyDbInstanceHttp,
          GetAlloyDbBackupHttp,
          GetAlloyDbUserHttp,
          GetAutonomousDatabaseHttp,
          GenerateWalletHttp,
          StartAutonomousDatabaseHttp,
          StopAutonomousDatabaseHttp,
          RestartAutonomousDatabaseHttp,
          GetCloudExadataInfrastructureHttp,
        ),
        Layer.mergeAll(
          GetCloudVmClusterHttp,
          GetDbSystemHttp,
          GetExadbVmClusterHttp,
          GetExascaleDbStorageVaultHttp,
          GetGoldengateConnectionHttp,
          GetGoldengateConnectionAssignmentHttp,
          GetGoldengateDeploymentHttp,
          GetOdbNetworkHttp,
          GetOdbNetworksOdbSubnetHttp,
          GetBigtableInstanceHttp,
          GetBigtableClusterHttp,
          GetBigtableTableHttp,
          GetDataprocClusterHttp,
          DataprocSubmitJobHttp,
          ExecuteSqlHttp,
          GetSqlInstanceHttp,
        ),
        Layer.mergeAll(
          GetSqlUserHttp,
          CreateExecutionHttp,
          CreateJobHttp,
          ServiceDirectoryGetEndpointHttp,
          ServiceDirectoryResolveHttp,
          GetKeyStringHttp,
          RecaptchaenterpriseCreateAssessmentHttp,
          CancelTrainingPipelineHttp,
          GenerateContentHttp,
          GetReasoningEngineHttp,
          GetSandboxEnvironmentHttp,
          GetSandboxEnvironmentTemplateHttp,
          GetTrainingPipelineHttp,
          PauseSandboxEnvironmentHttp,
          QueryReasoningEngineHttp,
          ResumeSandboxEnvironmentHttp,
        ),
        Layer.mergeAll(GetCustomClassHttp, GetPhraseSetHttp, RecognizeHttp),
        Layer.mergeAll(
          RunPipelineHttp,
          StopPipelineHttp,
          LookupHttp,
          CommitHttp,
          RunQueryHttp,
          GetDocumentSchemaHttp,
          GetContentwarehouseDocumentHttp,
          GetRuleSetHttp,
          GetSynonymSetHttp,
          PauseCollectorHttp,
        ),
        Layer.mergeAll(
          RegisterCollectorHttp,
          ResumeCollectorHttp,
          DeveloperconnectFetchGitRefsHttp,
          DeveloperconnectFetchReadTokenHttp,
          DeveloperconnectFetchReadWriteTokenHttp,
          GetManagedKafkaClusterHttp,
          GetManagedKafkaTopicHttp,
          GetManagedKafkaConnectClusterHttp,
          GetManagedKafkaSchemaRegistryHttp,
          RetailSearchHttp,
          RetailPredictHttp,
          GetCatalogItemHttp,
          DocumentaiProcessHttp,
          GetProcessorHttp,
          DocumentaiGetSchemaHttp,
          GetSchemaVersionHttp,
        ),
        Layer.mergeAll(
          AdaptiveMtTranslateHttp,
          GetAdaptiveMtDatasetHttp,
          GetGlossariesGlossaryEntryHttp,
          TranslateGetModelHttp,
          TranslateTextHttp,
          GetWorkstationClusterHttp,
          GetWorkstationConfigHttp,
          GetWorkstationHttp,
          GenerateAccessTokenHttp,
          StartWorkstationHttp,
          StopWorkstationHttp,
          GetEntityHttp,
        ),
      ).pipe(Layer.provide(gcpLive)),
    ),

    // The `gcp-gke` Kubernetes cluster adapter is provideMerged (not just
    // provided) so the cluster-agnostic `Kubernetes.*` workload providers
    // can resolve it from the ambient stack context.
    Layer.provideMerge(
      GkeKubernetesAdapter().pipe(Layer.provide(gcpLive), Layer.provide(DockerLive)),
    ),
    Layer.provideMerge(gcpLive),
    Layer.provideMerge(DockerLive),
    Layer.provideMerge(Command.providers()),
    Layer.orDie,
    // Erased on purpose: checking every consumer against the inferred union
    // of ~1,000 provider layers exhausts the type-checker's memory.
  ) as Layer.Layer<any, never, never>;

let cachedProviders: ReturnType<typeof makeProviders> | undefined;

/**
 * The GCP provider layer. Memoized: constructing it instantiates ~1,000
 * provider layers (several MB), and a Layer is an immutable description,
 * so every caller — each test file, each stack — shares one instance.
 */
export const providers = () => (cachedProviders ??= makeProviders());
