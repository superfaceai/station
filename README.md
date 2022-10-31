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

# Record new trafic with live API calls, more information bellow
$ yarn test:record grid/path/to/test.ts
```

Jest in station is configured to run tests inside `/grid` folder by default, with reporter located in `/jest/reporter` and can use groups to filter which tests to run (mainly used for tagging tests ready to continuous testing).

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './grid',
  runner: 'groups',
  reporters: ['default', '../dist/reporter.js']
};
```

### **Test with mocked traffic**

```shell
$ yarn test
```

This command runs tests with mocked traffic and therefore no live traffic is enabled. You can find recordings that this command uses as mocked traffic in `/nock`.

Recordings are categorised similarly as integrations in `/grid` folder:
`nock/<scope>/<profile-name>/<provider-name>/<usecase-name>/recording-<hash>.json`

- every recording gets hashed based on **input**, **test name** or **custom test name**
- this hash can be only seen with use of `DEBUG=superface:testing:hash*`

### **Test with live traffic**

```shell
$ yarn test:record
```

With this command, live traffic is enabled and therefore maps send requests to the live providers. This command also records this request and response. There are multiple scenarios what can happen:

- use-case does not have recording → records traffic and saves as default one
- use-case already have recording → records new traffic and compares it to the old one →
    - if it matches → do not save recording
    - if it doesn’t match → save new recording next to old one with suffix `-new`

### **Test with new mocked traffic**

```shell
$ yarn test:with_new_traffic
```

This command run tests without live traffic, similar as `yarn test`, but uses new recordings instead of default ones (if present). New recordings are always newly recorded traffic that does not match the default old one and are located next to the old one with suffix `-new`.

### **Test and replace old recording with new one**

**⚠️ This command should be run only when you’re sure that tests are passing with new recordings → `yarn test:with_new_traffic`**

```shell
$ yarn test:update_traffic
```

This commands run tests with mocked traffic, but also replaces old recording with new one (if present) before loading recordings - this means that tests are run with mocked new traffic already.

### **Test with live traffic with development reporting**

```shell
$ yarn test:record:dev
```

This command run tests with live traffic and record it, similar as `yarn test:record`. The script implementation looks like this:

```shell
$ TEST_ENV='dev' yarn test:record --group=live/safe
```

`TEST_ENV` sets development environment for reporter - to use local reporter that just logs the provider changes into console

`--group=live/safe` filters what tests to run, thanks to [jest-runner-groups](https://www.npmjs.com/package/jest-runner-groups) 

### **Test with live traffic with production reporting**

```shell
$ yarn test:record:prod
```

This command run tests with live traffic and record it, similar as `yarn test:record` or `yarn test:record:dev`. Only difference between `test:record:dev` is that it uses production reporter that reports provider changes to the public slack channel.

Slack channel can be changed with env variable `PROD_REPORTING_DESTINATION`. It expects channel id.

### **Test and update snapshots**

Since lot of tests written in station uses jest snapshots for comparing values from map, you might need to update snapshots to modify/add/remove some of them. You can do this simply by adding option `-u` or `--updateSnapshot`. For example:

```shell
$ yarn test -u

$ yarn test:record --updateSnapshot
```

---

### **Overall filtering of tests**

In each of command described above, you can use argument to specify integration, for example:

```shell
$ yarn test chat/messages/maps/slack

$ yarn test:record chat/messages/maps/slack

$ TEST_ENV='dev' yarn test:record chat/messages
```

This is important mainly in case of testing with live traffic when new recordings are stored and compared with old ones for each test that you run. For example if you want to record new traffic just for slack provider in profile `chat/messages`, you don’t want to record new traffic also for other providers in this profile.

### **Testing library DEBUG**

It also helps when you use `DEBUG` environment variable to see logs during test run.

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
- log **reporting** information:  `DEBUG=superface:testing:reporter*`

### **Network errors**

`NetworkError: Fetch failed: reject issue`

`SdkExecutionError: Request ended with network error: reject`

If you get `NetworkError` or `SdkExecutionError` during testing with mocked traffic(`yarn test`), it usually means that request didn’t get through. If nock (used for loading mocked traffic) can’t match recording, request is denied.

You can debug nock matching of recordings with `DEBUG=nock*` to see what went wrong.

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
