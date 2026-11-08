# Changelog

## Unreleased

- GCP native providers now declare nonthrowing helpers and preserve unexpected comparison failures as defects.
- Organization discovery and security scan reads now run their requests before using the results.
- Resource listings handle missing collections around the request, and model cleanup waits for each version before deleting the default version.
- Completed operation fallbacks now return their resource values without trying to run them as Effects.
