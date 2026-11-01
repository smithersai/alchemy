import * as Effect from "effect/Effect";
import { PrismaClient } from "./Client.js";
import type { AppCreateInput, AppDeploymentTarget, AppUpdateInput, BranchCreateInput, BranchUpdateInput, BucketCreateInput, BucketKeyCreateInput, BuildLogsQuery, DatabaseConnectionCreateInput, DeploymentCreateInput, DeploymentLogsQuery, ConnectionCreateInput, CustomDomainCreateInput, DatabaseCreateInput, DatabaseUpdateInput, EnvironmentVariableCreateInput, EnvironmentVariableUpdateInput, PrismaBranchIdFilter, ProjectCreateInput, ProjectDatabaseCreateInput, ProjectTransferInput, ProjectUpdateInput, RestoreDatabaseInput, ScmInstallIntentCreateInput, SourceRepositoryCreateInput } from "./Types.js";
export declare const listWorkspaces: (query?: {
    cursor?: string | null;
    limit?: number;
}) => Effect.Effect<import("./Types.js").Workspace[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getWorkspace: (id: string) => Effect.Effect<import("./Types.js").Workspace, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getCurrentPrincipal: () => Effect.Effect<import("./Types.js").CurrentPrincipal, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listRegions: (query?: {
    product?: "postgres" | "accelerate";
}) => Effect.Effect<import("./Types.js").Region[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listPostgresRegions: () => Effect.Effect<import("./Types.js").PostgresRegion[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listAccelerateRegions: () => Effect.Effect<import("./Types.js").AccelerateRegion[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listProjects: (query?: {
    cursor?: string | null;
    limit?: number;
}) => Effect.Effect<import("./Types.js").Project[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getProject: (id: string) => Effect.Effect<import("./Types.js").Project, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createProject: (input: ProjectCreateInput) => Effect.Effect<import("./Client.js").ProjectCreateResult, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const updateProject: (id: string, input: ProjectUpdateInput) => Effect.Effect<import("./Types.js").Project, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteProject: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const transferProject: (id: string, input: ProjectTransferInput) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listDatabases: (query?: {
    cursor?: string | null;
    limit?: number;
    projectId?: string;
    branchId?: PrismaBranchIdFilter;
    branchGitName?: string;
}) => Effect.Effect<import("./Types.js").Database[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listProjectDatabases: (projectId: string, query?: {
    cursor?: string | null;
    limit?: number;
}) => Effect.Effect<import("./Types.js").Database[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getDatabase: (id: string) => Effect.Effect<import("./Types.js").Database, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createDatabase: (input: DatabaseCreateInput) => Effect.Effect<import("./Client.js").DatabaseCreateResult, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createProjectDatabase: (projectId: string, input: ProjectDatabaseCreateInput) => Effect.Effect<import("./Client.js").ProjectDatabaseCreateResult, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const updateDatabase: (id: string, input: DatabaseUpdateInput) => Effect.Effect<import("./Types.js").Database, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteDatabase: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listBackups: (databaseId: string, query?: {
    limit?: number;
}) => Effect.Effect<import("./Types.js").BackupListResponse, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const restoreDatabase: (targetDatabaseId: string, input: RestoreDatabaseInput) => Effect.Effect<import("./Types.js").RestoredDatabase, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getDatabaseUsage: (databaseId: string, query?: {
    startDate?: string;
    endDate?: string;
}) => Effect.Effect<import("./Types.js").DatabaseUsage, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listConnections: (query?: {
    cursor?: string | null;
    limit?: number;
    databaseId?: string;
}) => Effect.Effect<import("./Types.js").DatabaseConnection[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listDatabaseConnections: (databaseId: string, query?: {
    cursor?: string | null;
    limit?: number;
}) => Effect.Effect<import("./Types.js").DatabaseConnection[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getConnection: (id: string) => Effect.Effect<import("./Types.js").DatabaseConnection, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createConnection: (input: ConnectionCreateInput) => Effect.Effect<import("./Types.js").DatabaseConnectionWithSecrets, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createDatabaseConnection: (databaseId: string, input: DatabaseConnectionCreateInput) => Effect.Effect<import("./Types.js").DatabaseConnectionWithSecrets, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteConnection: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const rotateConnection: (id: string) => Effect.Effect<import("./Types.js").DatabaseConnectionWithSecrets, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listBranches: (projectId: string, query?: {
    cursor?: string | null;
    limit?: number;
    gitName?: string;
    gitNameContains?: string;
}) => Effect.Effect<import("./Types.js").Branch[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getBranch: (id: string) => Effect.Effect<import("./Types.js").Branch, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createBranch: (projectId: string, input: BranchCreateInput) => Effect.Effect<import("./Types.js").Branch, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const updateBranch: (id: string, input: BranchUpdateInput) => Effect.Effect<import("./Types.js").Branch, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteBranch: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listBuckets: (query?: {
    cursor?: string | null;
    limit?: number;
    projectId?: string;
    branchId?: PrismaBranchIdFilter;
    branchGitName?: string;
}) => Effect.Effect<import("./Types.js").Bucket[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getBucket: (id: string) => Effect.Effect<import("./Types.js").Bucket, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createBucket: (input: BucketCreateInput) => Effect.Effect<import("./Types.js").Bucket, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteBucket: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listBucketKeys: (bucketId: string, query?: {
    cursor?: string | null;
    limit?: number;
}) => Effect.Effect<import("./Types.js").BucketKey[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createBucketKey: (bucketId: string, input: BucketKeyCreateInput) => Effect.Effect<import("./Types.js").BucketKeyWithSecret, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteBucketKey: (bucketId: string, keyId: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getCustomDomain: (id: string) => Effect.Effect<import("./Types.js").CustomDomain, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteCustomDomain: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const retryCustomDomain: (id: string) => Effect.Effect<import("./Types.js").CustomDomain, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listApps: (query?: {
    cursor?: string | null;
    limit?: number;
    projectId?: string;
    branchId?: PrismaBranchIdFilter;
    branchGitName?: string;
}) => Effect.Effect<import("./Types.js").App[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getApp: (id: string) => Effect.Effect<import("./Types.js").App, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createApp: (input: AppCreateInput) => Effect.Effect<import("./Types.js").App, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const updateApp: (id: string, input: AppUpdateInput) => Effect.Effect<import("./Types.js").App, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteApp: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const promoteApp: (id: string, target: AppDeploymentTarget) => Effect.Effect<import("./Types.js").PromoteAppResult, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const rollbackApp: (id: string, target: AppDeploymentTarget) => Effect.Effect<import("./Types.js").RollbackAppResult, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listAppDomains: (appId: string) => Effect.Effect<import("./Types.js").CustomDomain[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createAppDomain: (appId: string, input: CustomDomainCreateInput) => Effect.Effect<import("./Types.js").CustomDomainCreateResult, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listAppDeployments: (appId: string, query?: {
    cursor?: string | null;
    limit?: number;
}) => Effect.Effect<import("./Types.js").DeploymentListItem[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createAppDeployment: (appId: string, input?: DeploymentCreateInput) => Effect.Effect<import("./Types.js").DeploymentCreateResult, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getDeployment: (id: string) => Effect.Effect<import("./Types.js").Deployment, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteDeployment: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const startDeployment: (id: string) => Effect.Effect<import("./Types.js").StartDeploymentResult, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const stopDeployment: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getDeploymentLogsRequest: (id: string, query?: DeploymentLogsQuery) => Effect.Effect<import("./Types.js").DeploymentLogsRequest, import("@distilled.cloud/prisma").ConfigError | import("./Client.js").PrismaApiError, import("@distilled.cloud/prisma").Credentials>;
export declare const getBuildLogsRequest: (buildId: string, query?: BuildLogsQuery) => Effect.Effect<import("./Types.js").BuildLogsRequest, import("@distilled.cloud/prisma").ConfigError | import("./Client.js").PrismaApiError, import("@distilled.cloud/prisma").Credentials>;
export declare const listEnvironmentVariables: (query?: {
    cursor?: string | null;
    limit?: number;
    projectId?: string;
    class?: "production" | "preview";
    key?: string;
    branchId?: string;
}) => Effect.Effect<import("./Types.js").EnvironmentVariable[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getEnvironmentVariable: (id: string) => Effect.Effect<import("./Types.js").EnvironmentVariable, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createEnvironmentVariable: (input: EnvironmentVariableCreateInput) => Effect.Effect<import("./Types.js").EnvironmentVariable, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const updateEnvironmentVariable: (id: string, input: EnvironmentVariableUpdateInput) => Effect.Effect<import("./Types.js").EnvironmentVariable, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteEnvironmentVariable: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listIntegrations: (query: {
    workspaceId: string;
    cursor?: string | null;
    limit?: number;
}) => Effect.Effect<import("./Types.js").Integration[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listWorkspaceIntegrations: (workspaceId: string, query?: {
    cursor?: string | null;
    limit?: number;
}) => Effect.Effect<import("./Types.js").Integration[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getIntegration: (id: string) => Effect.Effect<import("./Types.js").Integration, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteIntegration: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const revokeWorkspaceIntegration: (workspaceId: string, clientId: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listScmInstallations: (query: {
    workspaceId: string;
    cursor?: string | null;
    limit?: number;
}) => Effect.Effect<import("./Types.js").ScmInstallation[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createScmInstallIntent: (input: ScmInstallIntentCreateInput) => Effect.Effect<import("./Types.js").ScmInstallIntent, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listScmInstallationRepositories: (installationId: string, query?: {
    cursor?: string | null;
    limit?: number;
}) => Effect.Effect<import("./Types.js").ScmRepository[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const listSourceRepositories: (query: {
    projectId: string;
    cursor?: string | null;
    limit?: number;
}) => Effect.Effect<import("./Types.js").SourceRepository[], import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const getSourceRepository: (id: string) => Effect.Effect<import("./Types.js").SourceRepository, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const createSourceRepository: (input: SourceRepositoryCreateInput) => Effect.Effect<import("./Types.js").SourceRepository, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
export declare const deleteSourceRepository: (id: string) => Effect.Effect<void, import("./Client.js").PrismaApiDecodeError | import("./Client.js").PrismaApiError, PrismaClient>;
