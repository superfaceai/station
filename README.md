# station

[![CI / CD](https://github.com/superfaceai/station/actions/workflows/ci_cd.yml/badge.svg)](https://github.com/superfaceai/station/actions/workflows/ci_cd.yml)
![TypeScript](https://img.shields.io/badge/%3C%2F%3E-Typescript-blue)

<img src="https://github.com/superfaceai/station/blob/main/.github/docs/LogoGreen.png" alt="superface logo" width="150" height="150">

Where use-cases are born. In this repository we build curated use-cases. Examples in this repository are ideal staring point for writing your own.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Security](#security)
- [Support](#support)
- [Contributing](#contributing)
- [License](#license)

## Background

Superface (super-interface) is a higher-order API, an abstraction on top of the modern APIs like GraphQL and REST. Superface is one interface to discover, connect, and query any use-cases available via conventional APIs.

Through its focus on application-level semantics, Superface decouples the clients from servers, enabling fully autonomous evolution. As such it minimizes the code base as well as errors and downtimes while providing unmatched resiliency and redundancy.

Superface allows for switching providers without development at a runtime in milliseconds. Furthermore, Superface decentralizes the composition and aggregation, and thus creates an Autonomous Integration Mesh.

Motivation behind Superface is nicely described in this [video](https://www.youtube.com/watch?v=BCvq3NXFb94) from APIdays conference.

You can get more information at https://superface.ai and https://superface.ai/docs.

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

# Record new trafic with live API calls
$ yarn test:record capabilites/path/to/test.ts
```

## Security

Superface is not man-in-the-middle so it does not require any access to secrets that are needed to communicate with provider API. Superface CLI only prepares super.json file with authorization fields in form of environment variable. You just set correct variables and communicate directly with provider API.

You can find more information in [OneSDK repository](https://github.com/superfaceai/one-sdk-js/blob/main/SECURITY.md).

## Support

If you need any additional support, have any questions or you just want to talk you can do that through our [documentation page](https://superface.ai/docs/support).

### Adding new use-case

If you are starting with authoring check our [guide](https://superface.ai/docs/guides/how-to-create).

Station repository has defined structure, here are commands for [Superface CLI](https://github.com/superfaceai/cli#superface-create) how to create profiles, maps and providers.

#### Create new profile

```shell
yarn superface create --profileId [scope](optional)/[name] --profile --profileFileName capabilities/[scope]/[name]/profile.supr
```

#### Create new provider

```shell
yarn superface create --providerName [provider_name] --provider --providerFileName providers/[provider_name].json
```

#### Create map for profile and provider

```shell
yarn superface create --profileId [scope](optional)/[name] --providerName [provider_name] --map --mapFileName capabilities/[scope]/[name]/maps/[provider_name].suma
```

#### Test the map

We encourage to use [Superface Testing](https://github.com/superfaceai/testing-lib) to write tests.

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

**2. Do call against live API to record traffic and create snapshot**

```shell
$ yarn test:record capabilities/scope/name/maps/example.test.ts
```

**3. Check result in snapshot**

Snapshot for test run should be created in location:

```
capabilities/scope/name/maps/__snapshots__/example.test.ts.snap
```

**4. Do post processing for traffic recording**

We try to sanitize recordings and remove any sensitive data. But you should still look at the recording and make sure it doesn't contain in sensitive data such as credentials or personal information, that shouldn't be public.

**5. Run tests with recorded traffic**

```shell
$ yarn test capabilities/scope/name/maps/example.test.ts
```

### Enviroment variables

Secretes used for authentication during tests are stored in `.env` and loaded using dotenv. Run `cp .env.example .env` to start from the template.

### Automated publishing

Station have Workflow to automate publishing. For details see [CI / CD](https://github.com/superfaceai/station/blob/main/.github/workflows/ci_cd.yml) workflow.

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
© 2021 Superface
