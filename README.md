# station

[![CI / CD](https://github.com/superfaceai/station/actions/workflows/ci_cd.yml/badge.svg)](https://github.com/superfaceai/station/actions/workflows/ci_cd.yml)
![TypeScript](https://img.shields.io/badge/%3C%2F%3E-Typescript-blue)

<img src="https://github.com/superfaceai/station/blob/main/.github/docs/LogoGreen.png" alt="superface logo" width="150" height="150">

Where capabilities are born. In this repository we build curated capabilities. Examples in this repository are ideal staring point for writing your own capability.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Security](#security)
- [Support](#support)
- [Development](#development)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Background

Superface (super-interface) is a higher-order API, an abstraction on top of the modern APIs like GraphQL and REST. Superface is one interface to discover, connect, and query any capabilities available via conventional APIs.

Through its focus on application-level semantics, Superface decouples the clients from servers, enabling fully autonomous evolution. As such it minimizes the code base as well as errors and downtimes while providing unmatched resiliency and redundancy.

Superface allows for switching capability providers without development at a runtime in milliseconds. Furthermore, Superface decentralizes the composition and aggregation, and thus creates an Autonomous Integration Mesh.

Motivation behind Superface is nicely described in this [video](https://www.youtube.com/watch?v=BCvq3NXFb94) from APIdays conference.

You can get more information at https://superface.ai and https://superface.ai/docs.

## Install

Install dependencies:

```
yarn install
```

Build TS files:

```
yarn build
```

## Usage

  <!-- commands -->

- [`station check`](#station-check)
- [`station compile`](#station-compile)
- [`station create DOCUMENTINFO`](#station-create-documentinfo)
- [`station generate PROFILENAME`](#station-generate-profilename)

## `station check`

Checks if all profiles have maps with corresponding version, scope, name, use case definitions and providers

```
USAGE
  $ station check

OPTIONS
  -h, --help   show CLI help
  -q, --quiet  When set to true, disables the shell echo output of action.

EXAMPLES
  $ station check
  $ station check -q
```

_See code: [dist/src/commands/check.ts](https://github.com/superfaceai/station/blob/v0.0.0/dist/src/commands/check.ts)_

## `station compile`

Compiles every profile and map from capabilities directory to superface/grid directory. For now it is safer to use generate command.

```
USAGE
  $ station compile

OPTIONS
  -g, --generate  Generate types for compiled files.
  -h, --help      show CLI help
  -q, --quiet     When set to true, disables the shell echo output of action.

EXAMPLES
  $ station compile
  $ station compile -q
  $ station compile -g
  $ station compile --generate
```

_See code: [dist/src/commands/compile.ts](https://github.com/superfaceai/station/blob/v0.0.0/dist/src/commands/compile.ts)_

## `station create DOCUMENTINFO`

Creates map, profile or provider file with basic template on a local filesystem.

```
USAGE
  $ station create DOCUMENTINFO

ARGUMENTS
  DOCUMENTINFO  Two arguments containing informations about the document.
                1. Document Type - type of document that will be created (profile or map or provider).
                2. Document Name - name of a file that will be created

OPTIONS
  -h, --help   show CLI help
  -q, --quiet  When set to true, disables the shell echo output of action.

EXAMPLES
  $ station create profile sms/service
  $ station create map sms/service twilio
  $ station create profile sms/service -q
  $ station create provider twilio
```

_See code: [dist/src/commands/create.ts](https://github.com/superfaceai/station/blob/v0.0.0/dist/src/commands/create.ts)_

## `station generate PROFILENAME`

Generates d.ts and js files into `superface/types/{scope}` folder, creates or updates `superface/sdk.ts` file and creates or updates `superface/types/{scope}/index.d.ts` file.

```
USAGE
  $ station generate PROFILENAME

ARGUMENTS
  PROFILENAME  Profile name in {scope}/{usecase} shape

OPTIONS
  -h, --help   show CLI help
  -q, --quiet  When set to true, disables the shell echo output of action.

EXAMPLES
  $ station generate sms/service
  $ station generate sms/service -q
```

_See code: [dist/src/commands/generate.ts](https://github.com/superfaceai/station/blob/v0.0.0/dist/src/commands/generate.ts)_

<!-- commandsstop -->

## `yarn test PATH`

Runs test files with suffix `.test.ts`. Running `yarn test` without path will run all test files and will probably fail.

```
USAGE
  $ yarn test PATH

ARGUMENTS
  PATH  Path to test file


EXAMPLES
  $ yarn test capabilities/vcs/user-repos/maps/bitbucket
```

## Security

Superface is not man-in-the-middle so it does not require any access to secrets that are needed to communicate with provider API. Superface CLI only prepares super.json file with authorization fields in form of environment variable. You just set correct variables and communicate directly with provider API.

You can find more information in [OneSDK repository](https://github.com/superfaceai/one-sdk-js/blob/main/SECURITY.md).

## Support

If you need any additional support, have any questions or you just want to talk you can do that through our [documentation page](https://superface.ai/docs).

## Development

When developing, start with cloning the repository using `git clone https://github.com/superfaceai/station.git` (or `git clone git@github.com:superfaceai/station.git` if you have repository access).

After cloning, the dependencies must be downloaded using `yarn install` or `npm install`.

Now the repository is ready for code changes.

The `package.json` also contains scripts (runnable by calling `yarn <script-name>` or `npm run <script-name>`):

- `lint` - lint the code (use `lint --fix` to run autofix)
- `format` - check the code formatting (use `firmat:fix` to autoformat)
- `prepush` - run `test`, `lint` and `format` checks. This should run without errors before you push anything to git.

Lastly, to build a local artifact run `yarn build` or `npm run build`.

**Note**: The project needs to be built (into the `dist` folder) to run cli commands.

**Note**: You can change url of API requests by setting `SUPERFACE_API_URL` environment variable to desired base url.

### Adding new capability

First, create new profile:

```
 station create profile {scope}/{usecase}
```

Edit created .supr file:

Secondly, create new provider:

```
 station create provider {provider}
```

Edit created .json file

Next, create map for created profile and provider:

```
 station create map {scope}/{usecase} {provider}
```

Edit created .suma file and test file (.test.ts)

Compile created files:

```
 station compile
```

Generate types if needed:

```
 station generate {scope}/{usecase}
```

Create tests for created capability. You can use existing tests as a starting point.
Test created capability:

```
 yarn test {path to test file}
```

Upload newly created files

```
station publish {path to profile}
station publish {path to map}
station publish {path to provider}
```

### Enviroment variables

Secretes used for authentication during tests are stored in `.env.capabilities` and loaded using dotenv. Run `cp .env.capabilities.example .env.capabilities` to start from the template.

### Automated publishing

Station have Workflow to automate capabilities publishing [Publish to Production](https://github.com/superfaceai/station/blob/main/.github/workflows/publish_production.yml).

**Publish to Production** is triggered manually from [Workflow detail](https://github.com/superfaceai/station/actions/workflows/publish_production.yml).

## Maintainers

- [@Jakub Vacek](https://github.com/Jakub-Vacek)
- [@Edward](https://github.com/TheEdward162)
- [@Lukáš Valenta](https://github.com/lukas-valenta)

## Contributing

**Please open an issue first if you want to make larger changes**

Feel free to contribute! Please follow the [Contribution Guide](CONTRIBUTION_GUIDE.md).

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
