# station

[![CI / CD](https://github.com/superfaceai/station/actions/workflows/ci_cd.yml/badge.svg)](https://github.com/superfaceai/station/actions/workflows/ci_cd.yml)
![TypeScript](https://img.shields.io/badge/%3C%2F%3E-Typescript-blue)

<img src="https://github.com/superfaceai/station/blob/main/.github/docs/LogoGreen.png" alt="superface logo" width="150" height="150">

Where use-cases are born. In this repository we build curated use-cases. Examples in this repository are an ideal starting point for writing your own.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Security](#security)
- [Support](#support)
- [Contributing](#contributing)
- [License](#license)

## Background

Superface (super-interface) is a higher-order API, an abstraction on top of modern APIs like GraphQL and REST. Superface is one interface to discover, connect, and query any use cases available via conventional APIs.

Through its focus on application-level semantics, Superface decouples the clients from servers, enabling fully autonomous evolution. As such, it minimizes the code base size as well as errors and downtimes while providing unmatched resiliency and redundancy.

Superface allows for switching providers without development at runtime in milliseconds. Furthermore, Superface decentralizes the composition and aggregation, and thus creates an Autonomous Integration Mesh.

Motivation behind Superface is nicely described in this [video](https://www.youtube.com/watch?v=BCvq3NXFb94) from APIdays conference.

You can learn more at https://superface.ai and https://superface.ai/docs.

## Install

Install dependencies:

```
yarn install
```

## Usage

```shell
# Check all files are correctly linked together
$ yarn check

# Runs linter on Profiles and maps
$ yarn lint

# Run tests
$ yarn test

# Record new trafic with live API calls, more information below
$ yarn test:record grid/path/to/test.ts
```

Jest in station is configured to run tests inside `/grid` folder by default, with reporter located in `/jest/reporter` and can use groups to filter which tests to run (mainly used for tagging tests ready to continuous testing).

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './grid',
  runner: 'groups',
  reporters: ['default', '../dist/reporter.js'],
};
```

### Test with mocked traffic

```shell
$ yarn test
```

Run tests against a mock server with prerecorded traffic. No request will reach a live API so it can be used safely without API credentials.

Traffic recordings are stored in `/nock` folder with the similar structure as tests under `/grid` folder and additional folder for each use case:

```
nock/<scope>/<profile-name>/<provider-name>/<usecase-name>/recording-<hash>.json
```

The `<hash>` is based either on its _input_ or _test name_ when test instance is specified, or _custom test name_ if provided. You can check the generated hashes when you enable the following environment variable: `DEBUG=superface:testing:hash*`

### Test with live traffic

```shell
$ yarn test:record
```

Run tests using live APIs, store requests and responses recordings for each use case. The following cases can happen depending on the existence of previous recordings:

- If a use case doesn't have recording → save it as a default recording
- If a use case has recording → record new traffic and compare it to the old one →
  - If the recordings match → don't save the new recording
  - If the recordings don’t match → save the new recording next to the old one with suffix `-new`

### Test with new mocked traffic

```shell
$ yarn test:with_new_traffic
```

Similar to `yarn test`, run tests against a mock server with prerecorded traffic, but use any available new recordings instead of default ones. New recordings are created by `yarn test:record` when the newly recorded traffic doesn't match the old one. New recordings are located next to old ones with suffix `new`.

### Test and replace old recording with new one

> **Warning**
> Run this command only when you're sure the tests pass with the new recordings (using `yarn test:with_new_traffic`).

```shell
$ yarn test:update_traffic
```

Replace the old traffic recordings with new ones (if present) and run tests using these new recordings.

### Test with live traffic with development reporting

```shell
$ yarn test:record:dev
```

Run tests under `live/safe` tests group with live traffic (similar to `yarn test:record`) and console reporter. This is useful for development of continuous live tests.

### Test with live traffic with production reporting

```shell
$ yarn test:record:prod
```

Run tests under `live/safe` group with live traffic, record it and report provider changes to Slack.

Set Slack channel ID with env variable `PROD_REPORTING_DESTINATION`.

### Updating test snapshots

If you change the map or record a new response, you may need to update Jest snapshots captured during the previous run. Use `-u` parameter to update snapshots:

```shell
$ yarn test -u

$ yarn test:record -u
```

---

### Tests filtering

In each of command described above, you can use argument to specify test file or pattern of that test file, for example:

```shell
$ yarn test chat/messages
```

This is necessary whenever you record a traffic to limit interaction with live APIs only to the changed maps and tests.

For example, if you want to record new traffic just for the `slack` provider and profile `chat/messages`, and ignore other providers:

```shell
$ yarn test:record chat/messages/maps/slack

$ TEST_ENV='dev' yarn test:record chat/messages
```

### Testing library DEBUG

Use `DEBUG` environment variable to check the testing library behavior during a test run.

- log **everything**: `DEBUG=superface:testing*`
- log **main setup**: `DEBUG=superface:testing`
  - perform results
  - start and end of recording/mocking HTTP traffic
  - start of `beforeRecordingLoad` and `beforeRecordingSave` functions
- log **setup** of superface components and recordings: `DEBUG=superface:testing:setup*`
  - setup of recording paths and superface components (profile, provider, usecase)
  - setup of superjson and local map
- log **hashing** of recordings: `DEBUG=superface:testing:hash*`
  - creation of recording hash
- log **recording/replacing** information: `DEBUG=superface:testing:recordings*`
- log **matching** information: `DEBUG=superface:testing:matching*`
- log **reporting** information: `DEBUG=superface:testing:reporter*`

### Troubleshooting common errors

You can run into the following errors when running tests:

```
NetworkError: Fetch failed: reject issue
SdkExecutionError: Request ended with network error: reject
```

When you are testing with mocked traffic (using `yarn test`), it means that the request didn't match any recordings and was rejected. Try rerecording the traffic using `yarn test:record`. You can also debug the matching behavior with `DEBUG=nock*` env variable.

## Security

Superface is not a man-in-the-middle so it does not require any access to secrets that are needed to communicate with provider API. Superface CLI only prepares super.json file with authorization fields in the form of environment variables. You just set correct variables and communicate directly with provider API.

You can find more information in [OneSDK repository](https://github.com/superfaceai/one-sdk-js/blob/main/SECURITY.md).

## Support

If you need any additional support, have any questions, or you just want to talk you can do that through our [support page](https://superface.ai/docs/support).

### Adding new use-case

If you are starting with authoring, check our [guide](https://superface.ai/docs/guides/how-to-create).

Station repository has a defined structure. Here are the commands [Superface CLI](https://github.com/superfaceai/cli#superface-create) commands for creating profiles, maps and providers.

#### Create new profile

```shell
yarn superface create --profileId [scope](optional)/[name] --profile --profileFileName grid/[scope]/[name]/profile.supr
```

#### Create new provider

```shell
yarn superface create --providerName [provider_name] --provider --providerFileName providers/[provider_name].json
```

#### Create map for profile and provider

```shell
yarn superface create --profileId [scope](optional)/[name] --providerName [provider_name] --map --mapFileName grid/[scope]/[name]/maps/[provider_name].suma
```

#### Test the map

We encourage using the [Superface Testing](https://github.com/superfaceai/testing-lib) to write tests.

**1. Create test file**

Alongside `.suma` file create `.test.ts` and use this template.

```ts
import { SuperfaceTest } from '@superfaceai/testing';

describe(`scope/name/provider_name}`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'scope/name',
      provider: 'provider_name',
    });
  });

  describe('UseCase', () => {
    it('performs successfully', async () => {
      await expect(
        superface.run({
          useCase: 'UseCase',
          input: {
            field1: '',
            field2: '',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
```

_All inputs should be written directly to the test file and shouldn't use environment variables._

**2. Make a call against live API to record traffic and create a snapshot**

```shell
$ yarn test:record grid/[scope]/[name]/maps/[provider].test.ts
```

**3. Check result in the snapshot**

Snapshot for test run should be created in location:

```
grid/[scope]/[name]/maps/__snapshots__/[provider].test.ts.snap
```

**4. Do post processing for traffic recording**

We try to sanitize recordings and remove any sensitive data. But you should still look at the recording and make sure it doesn't contain sensitive data such as credentials or personal information that shouldn't be public.

**5. Run tests with recorded traffic**

```shell
$ yarn test grid/[scope]/[name]/maps/example.test.ts
```

### Debugging maps

You can set the OneSDK `DEBUG` environment variable to enable logging for debugging purposes:

```
DEBUG="superface:http*"
```

For example, when recording traffic:

```
$ DEBUG="superface:http*" yarn test:record grid/[scope]/[name]/maps/[provider].test.ts
```

### Enviroment variables

Secretes used for authentication during tests are stored in `.env` and loaded using `dotenv`. Run `cp .env.example .env` to start from the template.

### Automated publishing

Station uses Workflow to automate publishing. For details see the [CI / CD](https://github.com/superfaceai/station/blob/main/.github/workflows/ci_cd.yml) workflow.

## Contributing

**Please open an issue first if you want to make larger changes**

Feel free to contribute! Please follow the [Contribution Guide](CONTRIBUTING.md).

Licenses of node_modules are checked during CI/CD for every commit. Only the following licenses are allowed:

- 0BDS
- MIT
- Apache-2.0
- ISC
- BSD-3-Clause
- BSD-2-Clause
- CC-BY-4.0
- CC-BY-3.0;BSD
- CC0-1.0
- Unlicense
- UNLICENSED

Note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

The Superface is licensed under the [MIT](LICENSE).
© 2022 Superface
