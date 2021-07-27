# station

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/superfaceai/station/CI)
![NPM](https://img.shields.io/npm/v/@superfaceai/station)
![[NPM](https://img.shields.io/npm/l/@superfaceai/station)](LICENSE)
![TypeScript](https://img.shields.io/badge/%3C%2F%3E-Typescript-blue)

<img src="https://github.com/superfaceai/station/blob/main/docs/LogoGreen.png" alt="superface logo" width="150" height="150">

Where capabilities are born. In this repository we build curated capabilities. Examples in this repository are ideal staring point for writing your own capability.


## Install

Install dependencies: 
```
yarn install
```

Build TS files:
```
yarn build
```
set .env variables from .env.example. For publishing you need to set SUPERFACE_STORE_REFRESH_TOKEN (Possilbe onyl for SuperFace emlpoyes for now)

## Commands
  <!-- commands -->
* [`station check`](#station-check)
* [`station compile`](#station-compile)
* [`station create DOCUMENTINFO`](#station-create-documentinfo)
* [`station generate PROFILENAME`](#station-generate-profilename)
* [`station publish [PATH]`](#station-publish-path)

## `station check`

Checks if all profiles have maps with coresponding version, scope, name, usecase definitions and providers

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

_See code: [dist/src/commands/check.ts](https://github.com/superfaceai/station/blob/v0.0.1/dist/src/commands/check.ts)_

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

_See code: [dist/src/commands/compile.ts](https://github.com/superfaceai/station/blob/v0.0.1/dist/src/commands/compile.ts)_

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

_See code: [dist/src/commands/create.ts](https://github.com/superfaceai/station/blob/v0.0.1/dist/src/commands/create.ts)_

## `station generate PROFILENAME`

Generates .ts files into `superface/types/{scope}` folder, creates or updates `superface/sdk.ts` file and creates or updates `superface/types/{scope}/index.d.ts` file.

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

_See code: [dist/src/commands/generate.ts](https://github.com/superfaceai/station/blob/v0.0.1/dist/src/commands/generate.ts)_

## `station publish [PATH]`

Uploads map/profile/provider to Store - use paths to `.supr` file for profiles, `.suma` for maps and `.json` for providers. Do not use path ending with `.ast.json` (compiled files).

```
USAGE
  $ station publish [PATH]

ARGUMENTS
  PATH  Path to profile, map or provider

OPTIONS
  -f, --force  Publishes without asking any confirmation.
  -h, --help   show CLI help
  -q, --quiet  When set to true, disables the shell echo output of action.
  --all        Publish all profiles, maps and providers
  --dry-run    Runs without sending actual request.

EXAMPLES
  $ station publish
  $ station publish --dry-run
  $ station publish --force
  $ station publish capabilities/vcs/user-repos/maps/bitbucket.suma
  $ station publish capabilities/vcs/user-repos/maps/bitbucket.suma -q
```

_See code: [dist/src/commands/publish.ts](https://github.com/superfaceai/station/blob/v0.0.1/dist/src/commands/publish.ts)_
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

## Adding new capability

First, create new profile:

```
 station create profile {scope}/{usecase}
```
Edit created .supr file

Secondly, create new provider:

```
 station create provider {provider}
```

Edit created .json file

Next, create map for created profile and provider

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

Test created capability

```
 yarn test {path to test file}
```

Upload newly created files
```
station publish {path to profile}
station publish {path to map}
station publish {path to provider}
```

## Enviroment variables

Secretes used for authentication during tests are stored in `.env.capabilities` and loaded using dotenv. Run `cp .env.capabilities.example .env.capabilities` to start from the template.

## Automated publishing

Station have two Workflows to automate capabilities publishing [Publish to Production](https://github.com/superfaceai/station/blob/main/.github/workflows/publish_production.yml) and [Publish to Staging](https://github.com/superfaceai/station/blob/main/.github/workflows/publish_staging.yml).

**Publish to Staging** is triggered everytime change is pushed to `main` branch. 

**Publish to Production** is triggered manually from [Workflow detail](https://github.com/superfaceai/station/actions/workflows/publish_production.yml).
