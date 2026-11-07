import * as schemas from "@distilled.cloud/aws/schemas";
import * as Effect from "effect/Effect";
/**
 * Reads the observed tag map for an EventBridge Schemas resource ARN. A
 * missing resource yields `{}` so callers treat it as "no tags observed".
 */
export declare const readSchemasTags: (resourceArn: string) => Effect.Effect<Record<string, string>, schemas.BadRequestException | schemas.ForbiddenException | schemas.InternalServerErrorException | import("@distilled.cloud/aws/Errors").CommonErrors, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
/**
 * Reconciles the tags on a Schemas resource to `{ ...user, ...internal }`,
 * diffing against the OBSERVED cloud tags (so adoption converges). Applies
 * only the delta: `tagResource` for upserts, `untagResource` for removals.
 */
export declare const syncSchemasTags: (resourceArn: string, id: string, userTags: Record<string, string> | undefined) => Effect.Effect<void, import("@distilled.cloud/aws/Errors").AccessDeniedException | import("@distilled.cloud/aws/Credentials").AwsCredentialProviderError | schemas.BadRequestException | import("@distilled.cloud/aws/Credentials").ConflictingSSORegion | import("@distilled.cloud/aws/Credentials").ConflictingSSOStartUrl | import("@distilled.cloud/aws/SigV4").CryptoError | import("@distilled.cloud/aws/Errors").EndpointError | import("@distilled.cloud/aws/Credentials").ExpiredSSOToken | import("@distilled.cloud/aws/Errors").ExpiredTokenException | schemas.ForbiddenException | import("effect/http/HttpClientError").HttpClientError | import("@distilled.cloud/aws/Errors").IncompleteSignature | import("@distilled.cloud/aws/Errors").InternalFailure | schemas.InternalServerErrorException | import("@distilled.cloud/aws/Credentials").InvalidSSOProfile | import("@distilled.cloud/aws/Credentials").InvalidSSOToken | import("@distilled.cloud/aws/SigV4").InvalidSigningHeaders | import("@distilled.cloud/aws/SigV4").InvalidSigningUrl | import("@distilled.cloud/aws/Errors").MalformedHttpRequestException | import("@distilled.cloud/aws/Region").MissingRegion | import("@distilled.cloud/aws/Errors").NoMatchingRuleError | import("@distilled.cloud/aws/Errors").NotAuthorized | schemas.NotFoundException | import("@distilled.cloud/aws/Errors").OperationAborted | import("@distilled.cloud/aws/Errors").OptInRequired | import("@distilled.cloud/aws/Errors").ParseError | import("effect/PlatformError").PlatformError | import("@distilled.cloud/aws/Credentials").ProfileNotFound | import("@distilled.cloud/aws/Errors").RequestAbortedException | import("@distilled.cloud/aws/Errors").RequestEntityTooLargeException | import("@distilled.cloud/aws/Errors").RequestExpired | import("@distilled.cloud/aws/Errors").RequestTimeoutException | import("@distilled.cloud/aws/Errors").ServiceUnavailable | import("@distilled.cloud/aws/Credentials").SharedConfigError | import("effect/ConfigProvider").SourceError | import("@distilled.cloud/aws/Credentials").SsoPortalError | import("@distilled.cloud/aws/Errors").ThrottlingException | import("@distilled.cloud/aws/Errors").UnknownAwsError | import("@distilled.cloud/aws/Errors").UnknownOperationException | import("@distilled.cloud/aws/Errors").UnrecognizedClientException | import("@distilled.cloud/aws/Errors").ValidationError | import("@distilled.cloud/aws/Errors").ValidationException, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
/**
 * Canonicalizes a JSON document string for comparison: parses and re-stringifies
 * with recursively sorted object keys so semantically-equal documents compare
 * equal regardless of key order or whitespace. Non-JSON content is returned
 * verbatim.
 */
export declare const canonicalJson: (content: string) => string;
