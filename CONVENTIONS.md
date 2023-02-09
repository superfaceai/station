# Conventions

This document gives coding conventions for the Superface use-cases created in [Station repository](https://github.com/superfaceai/station).

## Profile

### Structure

- Use 2 spaces per indentation level.
- Profile SHOULD contain one usecase.
- Usecase MUST have error defined.
- Usecase MUST have defined safety.
- Usecase SHOULD contain at least one example of success.
- Usecase SHOULD contain at least one example of error.
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
- Service base URL MUST NOT contain API version.
- Security Scheme Id MUST use `-` (dash) as delimiter.
- Security Scheme Id SHOULD be named same as in provider documentation.

### Tests

- Use-case MUST have automated tests.
- TODO: Link to README section about testing.

### Error handling

#### Handling domain-specific errors
The profile error model should define domain-specific error codes. Domain-specific error codes are contract of the profile, and help with harmonization of multiple providers.

Example of error model:

```
model Error {
    """
    Error Title
    A short, human-readable summary of the problem type.
    """
    title!
    """
    Error Detail
    A human-readable explanation specific to this occurrence of the problem.
    """
    detail
    """
    Code
    Error code.
    """
    code! enum {
      """
      Unauthenticated
      There was a problem authenticating your request. Check that you are passing valid credentials.
      """
      Unauthenticated
      """
      Unauthorized
      The request is understood, but it has been refused or access is not allowed.
      """
      Unauthorized
      """
      CV MIME type not supported
      CV MIME type is not supported by the provider.
      """
      CVMIMETypeNotSupported
  }!
}
```




#### Handling unknown responses

Unhandled http responses in Comlink maps provides little information about the error to OneSDK client. Example of such error output:

```
Err {
  "error": "HTTPError: HTTP Error
AST Path: definitions[1].statements[0]
Original Map Location: Line 44, column 3",
}
```

The error output lacks information about status code and body of the response.

You should handle unknown responses in map and map them to error model with HTTP status code and body of the request.

Map example:

```
map YourUseCase {
  http GET "/something" {
    request "application/json" {
      ...
    }

    //handle successful responses and domain-specific error responses
    ...

    //handle unknown responses
    response {
      map error {
        title = "Unknown error"
        detail = `Status code: ${statusCode}, body: ${JSON.stringify(body, null, 2)}`
        code = 'UnknownError'
      }
    }
  }
}
```

Example of unknown response error output when mapped:
```
Err {
  "error": "MappedHTTPError: Expected HTTP error
Properties: {
  "title": "Unknown error",
  "detail": "Status code: 404, body: \\"Not found\\"",
  "code": "UnknownError"
}
AST Path: definitions[1].statements[0].responseHandlers[1].statements[1]
Original Map Location: Line 64, column 7",
}
```

Be aware that handling HTTP 500 status codes will prevent OneSDK to failover to backup provider. HTTP 500 status codes handling is not recommended for commodity use cases like sending e-mails, sms messages, getting weather forecast,...


## Example Use-case

For reference capabability see [communication/send-email](https://github.com/superfaceai/station/tree/main/grid/communication/send-email).
