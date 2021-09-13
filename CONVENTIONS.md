# Conventions

This document gives coding conventions for the Superface capabilities created in [Station repository](https://github.com/superfaceai/station).

## Profile

### Structure

- Use 2 spaces per indentation level.
- Profile SHOULD contain one usecase.
- Usecase MUST have error defined.
- Usecase MUST have defined safety.
- Fields MUST use [required](https://superface.ai/docs/comlink/profile#RequiredField) declaration.
- Named fields and models SHOULD NOT be used, unless they are reused. _(Better Profile rendering)_

### Naming conventions

- Profile filename MUST use `-` (dash) as delimiter.
- Usecase name MUST use **PascalCase** format.
- Field name MUST use **camelCase** format.

### Descriptions

- Use block string literal `"""` when writing title and description.
- Profile MUST have title and description.
- Every usecase MUST have title and description.
- Every field MUST have title and description.

### Map

- Use 2 spaces per indentation level.

There are no other conventions right now.
We want first gather more content to understand how Comlink maps are written to decide what conventions would make sense.

### Provider

- Provider name MUST use `-` (dash) as delimiter.
- Provider Id SHOULD be short and descriptive.
- Provider Id MUST NOT be misleading.
- Default service Id for versioned APIs SHOULD match the version.
- Security Scheme Id MUST use `-` (dash) as delimiter.
- Security Scheme Id SHOULD be named same as in provider documentation.

### Tests

- Capability MUST have automated tests.
- TODO: Link to README section about testing.

## Example Capability

For reference capabability see [communication/send-email](https://github.com/superfaceai/station/tree/main/capabilities/communication/send-email).
