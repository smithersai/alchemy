export { AccessKey, AccessKeyProvider } from "./AccessKey.vibe";
export { AccountAlias, AccountAliasProvider } from "./AccountAlias.vibe";
// Runtime bindings (audit/insight surface). The shared `BindingHttp.ts`
// scaffolding is intentionally NOT exported.
export { GenerateCredentialReport } from "./GenerateCredentialReport.vibe";
export { GenerateCredentialReportHttp } from "./GenerateCredentialReportHttp.vibe";
export { GenerateServiceLastAccessedDetails } from "./GenerateServiceLastAccessedDetails.vibe";
export { GenerateServiceLastAccessedDetailsHttp } from "./GenerateServiceLastAccessedDetailsHttp.vibe";
export { GetAccessKeyLastUsed } from "./GetAccessKeyLastUsed.vibe";
export { GetAccessKeyLastUsedHttp } from "./GetAccessKeyLastUsedHttp.vibe";
export { GetAccountAuthorizationDetails } from "./GetAccountAuthorizationDetails.vibe";
export { GetAccountAuthorizationDetailsHttp } from "./GetAccountAuthorizationDetailsHttp.vibe";
export { GetAccountSummary } from "./GetAccountSummary.vibe";
export { GetAccountSummaryHttp } from "./GetAccountSummaryHttp.vibe";
export { GetContextKeysForCustomPolicy } from "./GetContextKeysForCustomPolicy.vibe";
export { GetContextKeysForCustomPolicyHttp } from "./GetContextKeysForCustomPolicyHttp.vibe";
export { GetContextKeysForPrincipalPolicy } from "./GetContextKeysForPrincipalPolicy.vibe";
export { GetContextKeysForPrincipalPolicyHttp } from "./GetContextKeysForPrincipalPolicyHttp.vibe";
export { GetCredentialReport } from "./GetCredentialReport.vibe";
export { GetCredentialReportHttp } from "./GetCredentialReportHttp.vibe";
export { GetServiceLastAccessedDetails } from "./GetServiceLastAccessedDetails.vibe";
export { GetServiceLastAccessedDetailsHttp } from "./GetServiceLastAccessedDetailsHttp.vibe";
export { GetServiceLastAccessedDetailsWithEntities } from "./GetServiceLastAccessedDetailsWithEntities.vibe";
export { GetServiceLastAccessedDetailsWithEntitiesHttp } from "./GetServiceLastAccessedDetailsWithEntitiesHttp.vibe";
export { ListPoliciesGrantingServiceAccess } from "./ListPoliciesGrantingServiceAccess.vibe";
export { ListPoliciesGrantingServiceAccessHttp } from "./ListPoliciesGrantingServiceAccessHttp.vibe";
export { SimulateCustomPolicy } from "./SimulateCustomPolicy.vibe";
export { SimulateCustomPolicyHttp } from "./SimulateCustomPolicyHttp.vibe";
export { SimulatePrincipalPolicy } from "./SimulatePrincipalPolicy.vibe";
export { SimulatePrincipalPolicyHttp } from "./SimulatePrincipalPolicyHttp.vibe";
export { AccountPasswordPolicy, AccountPasswordPolicyProvider } from "./AccountPasswordPolicy.vibe";
export { Group, GroupProvider } from "./Group.vibe";
export { GroupMembership, GroupMembershipProvider } from "./GroupMembership.vibe";
export { InstanceProfile, InstanceProfileProvider } from "./InstanceProfile.vibe";
export { LoginProfile, LoginProfileProvider } from "./LoginProfile.vibe";
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
export { SAMLProvider, SAMLProviderProvider } from "./SAMLProvider.vibe";
export { ServerCertificate, ServerCertificateProvider } from "./ServerCertificate.vibe";
export {
  ServiceLinkedRole,
  ServiceLinkedRoleDeletionFailed,
  ServiceLinkedRoleProvider,
} from "./ServiceLinkedRole.ts";
export {
  ServiceSpecificCredential,
  ServiceSpecificCredentialProvider,
} from "./ServiceSpecificCredential.vibe";
export { SigningCertificate, SigningCertificateProvider } from "./SigningCertificate.vibe";
export { SSHPublicKey, SSHPublicKeyProvider } from "./SSHPublicKey.vibe";
export { User, UserProvider } from "./User.vibe";
export { VirtualMFADevice, VirtualMFADeviceProvider } from "./VirtualMFADevice.vibe";
