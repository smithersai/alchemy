# Changelog

## Unreleased

- AWS resource error handlers now compile without losing their response types.
- CloudWatch alarm-name accessors now resolve to strings in `DescribeAlarms` requests.
- Scheduler event sources resolve converted builder modules correctly.
- String-valued SQS policies and Cloud Control documents parse inside provider Effects while preserving existing defects.
- Local provider factories and Step Functions pipe helpers preserve their TypeScript calling behavior during native migration.
- The Foldkit example enables JSX typechecking for imported library components.
- Resource diff guards preserve getter failures as defects, and HTTP resource callbacks retain their existing synchronous contracts.
