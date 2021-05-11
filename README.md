# station
Where capabilities are born.

**note**: we are now using public superface packages so please update (or delete) your `.npmrc` not to use superface private registry.

Also, check `.npmrc` in "home" directory.

## Install

Install dependencies: 
```
yarn install
```

Build TS files:
```
yarn build
```
set .env variables from .env.example. For publishing you need to set SUPERFACE_STORE_REFRESH_TOKEN you can obtain it on https://superface.dev/auth/github

Repository is not released to NPM so to use it link it locally:
```
yarn link
```
## Naming conventions

* scope directory name must be valid [document name](https://spec.superface.dev/2021.04.26/profile-spec.html#DocumentNameIdentifier). We use kebab case eg. `delivery-tracking`.

* usecase directory name must be valid [document name](https://spec.superface.dev/2021.04.26/profile-spec.html#DocumentNameIdentifier). We use kebab case eg. `pull-request`. For usecase name in .suma or .supr files we use camel case eg. `PullRequest`.

* version directory name must be valid [semantic version](https://spec.superface.dev/2021.04.26/profile-spec.html#SemanticVersion) eg. `1.0.0`.

* provider file name must be valid [provider](https://spec.superface.dev/2021.04.26/provider-spec.yaml). We use kebab case eg. `dhl-unified`.


## Directory structure 

Folder of each capability is structured according to its scope, usecase and version. Every version of a usecase has own superface directory with super.json, types definitions a grid (gitignored). To make tests work environment variable `SUPERFACE_PATH` must contain path pointing to super.json file of tested file. This is prepared for you when you run create map command.

Provider folder is shared amongst capabilities.

## Adding new capability

First, create new profile:

```
 station create profile {scope}/{usecase}@{version}
```
Edit created .supr file

Secondly, create new provider:

```
 station create provider {scope}/{usecase}@{version} {provider}
```

Edit created .json file

Next, create map for created profile and provider

```
 station create map {scope}/{usecase}@{version} {provider}
```

Edit created .suma file and test file (.test.ts)

Compile created files:

```
 station compile
```

Generate types if needed:

```
 station generate {scope}/{usecase}@{version}
```

Test created capability

```
 yarn test {path to test file}
```

Upload newly created files
```
station publish profile {scope}/{usecase}@{version}
station publish map {scope}/{usecase}@{version} {provider}
station publish provider {provider}
```

## Enviroment variables

Secrets used for authentication during tests are stored in `.env.capabilities` and loaded using dotenv. Run `cp .env.capabilities.example .env.capabilities` to start from the template.

## Commands
  <!-- commands -->
* [`station check`](#station-check)
* [`station compile`](#station-compile)
* [`station create DOCUMENTINFO`](#station-create-documentinfo)
* [`station generate PROFILENAME`](#station-generate-profilename)
* [`station publish DOCUMENTINFO`](#station-publish-documentinfo)

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

Compiles every profile and map from capabilities directory.

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
  $ station create profile sms/service@1.2.3
  $ station create map sms/service@1.2.3 twilio
  $ station create profile sms/service@1.2.3 -q
  $ station create provider sms/service@1.2.3 twilio
```

_See code: [dist/src/commands/create.ts](https://github.com/superfaceai/station/blob/v0.0.1/dist/src/commands/create.ts)_

## `station generate PROFILENAME`

Generates .ts files into `capabilities/{scope}/{usecase}/{version}/superface/types/{scope}` folder, creates or updates `sdk.ts` file and creates or updates `index.d.ts` file.

```
USAGE
  $ station generate PROFILENAME

ARGUMENTS
  PROFILENAME  Profile name in {scope}/{usecase}@{version} shape

OPTIONS
  -h, --help   show CLI help
  -q, --quiet  When set to true, disables the shell echo output of action.

EXAMPLES
  $ station generate sms/service@1.2.3
  $ station generate sms/service@1.2.3 -q
```

_See code: [dist/src/commands/generate.ts](https://github.com/superfaceai/station/blob/v0.0.1/dist/src/commands/generate.ts)_

## `station publish DOCUMENTINFO`

Uploads map/profile/provider to Store - use paths to `.supr` file for profiles.

```
USAGE
  $ station publish DOCUMENTINFO

ARGUMENTS
  DOCUMENTINFO  Two arguments containing informations about the document.
                1. Document Type - type of document that will be published (profile or map or provider).
                2. Document Name - name of a file that will be published

OPTIONS
  -h, --help        show CLI help
  -p, --production  Publish to production server.
  -q, --quiet       When set to true, disables the shell echo output of action.

EXAMPLES
  $ station publish profile sms/service@1.2.3
  $ station publish map sms/service@1.2.3 twilio
  $ station publish profile sms/service@1.2.3 -p
  $ station publish provider twilio
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
  $ yarn test capabilities/vcs/user-repos/1.0.0/maps/bitbucket
```

