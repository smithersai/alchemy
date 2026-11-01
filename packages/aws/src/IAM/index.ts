export { AccessKey, AccessKeyProvider } from "./AccessKey.ts";
export { AccountAlias, AccountAliasProvider } from "./AccountAlias.ts";
// Runtime bindings (audit/insight surface). The shared `BindingHttp.ts`
// scaffolding is intentionally NOT exported.
export { GenerateCredentialReport } from "./GenerateCredentialReport.ts";
export { GenerateCredentialReportHttp } from "./GenerateCredentialReportHttp.vibe";
export { GenerateServiceLastAccessedDetails } from "./GenerateServiceLastAccessedDetails.ts";
export { GenerateServiceLastAccessedDetailsHttp } from "./GenerateServiceLastAccessedDetailsHttp.vibe";
export { GetAccessKeyLastUsed } from "./GetAccessKeyLastUsed.ts";
export { GetAccessKeyLastUsedHttp } from "./GetAccessKeyLastUsedHttp.vibe";
export { GetAccountAuthorizationDetails } from "./GetAccountAuthorizationDetails.ts";
export { GetAccountAuthorizationDetailsHttp } from "./GetAccountAuthorizationDetailsHttp.vibe";
export { GetAccountSummary } from "./GetAccountSummary.ts";
export { GetAccountSummaryHttp } from "./GetAccountSummaryHttp.vibe";
export { GetContextKeysForCustomPolicy } from "./GetContextKeysForCustomPolicy.ts";
export { GetContextKeysForCustomPolicyHttp } from "./GetContextKeysForCustomPolicyHttp.vibe";
export { GetContextKeysForPrincipalPolicy } from "./GetContextKeysForPrincipalPolicy.ts";
export { GetContextKeysForPrincipalPolicyHttp } from "./GetContextKeysForPrincipalPolicyHttp.vibe";
export { GetCredentialReport } from "./GetCredentialReport.ts";
export { GetCredentialReportHttp } from "./GetCredentialReportHttp.vibe";
export { GetServiceLastAccessedDetails } from "./GetServiceLastAccessedDetails.ts";
export { GetServiceLastAccessedDetailsHttp } from "./GetServiceLastAccessedDetailsHttp.vibe";
export { GetServiceLastAccessedDetailsWithEntities } from "./GetServiceLastAccessedDetailsWithEntities.ts";
export { GetServiceLastAccessedDetailsWithEntitiesHttp } from "./GetServiceLastAccessedDetailsWithEntitiesHttp.vibe";
export { ListPoliciesGrantingServiceAccess } from "./ListPoliciesGrantingServiceAccess.ts";
export { ListPoliciesGrantingServiceAccessHttp } from "./ListPoliciesGrantingServiceAccessHttp.vibe";
export { SimulateCustomPolicy } from "./SimulateCustomPolicy.ts";
export { SimulateCustomPolicyHttp } from "./SimulateCustomPolicyHttp.vibe";
export { SimulatePrincipalPolicy } from "./SimulatePrincipalPolicy.ts";
export { SimulatePrincipalPolicyHttp } from "./SimulatePrincipalPolicyHttp.vibe";
export { AccountPasswordPolicy, AccountPasswordPolicyProvider } from "./AccountPasswordPolicy.ts";
export { Group, GroupProvider } from "./Group.ts";
export { GroupMembership, GroupMembershipProvider } from "./GroupMembership.ts";
export { InstanceProfile, InstanceProfileProvider } from "./InstanceProfile.vibe";
export { LoginProfile, LoginProfileProvider } from "./LoginProfile.ts";
export { OpenIDConnectProvider, OpenIDConnectProviderProvider } from "./OpenIDConnectProvider.vibe";
export {
  normalizePolicyDocument,
  Policy,
  PolicyProvider,
  stringifyPolicyDocument,
  type IamAction,
  type PolicyDocument,
  type PolicyStatement,
  type ServiceControlPolicyDocument,
  type ServiceControlPolicyStatement,
} from "./Policy.vibe";
export { Role, RoleProvider } from "./Role.ts";
export { SAMLProvider, SAMLProviderProvider } from "./SAMLProvider.ts";
export { ServerCertificate, ServerCertificateProvider } from "./ServerCertificate.vibe";
export {
  ServiceLinkedRole,
  ServiceLinkedRoleDeletionFailed,
  ServiceLinkedRoleProvider,
} from "./ServiceLinkedRole.ts";
export {
  ServiceSpecificCredential,
  ServiceSpecificCredentialProvider,
} from "./ServiceSpecificCredential.ts";
export { SigningCertificate, SigningCertificateProvider } from "./SigningCertificate.ts";
export { SSHPublicKey, SSHPublicKeyProvider } from "./SSHPublicKey.ts";
export { User, UserProvider } from "./User.ts";
export { VirtualMFADevice, VirtualMFADeviceProvider } from "./VirtualMFADevice.ts";
