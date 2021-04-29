# station
Where capabilities are born.

**note**: we are now using public superface packages. Only private Station dependency is `service-client` so please update your `.npmrc` to use superface private registry only for `service-client`:

```
@superfaceai/service-client:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=xxxxx
```

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

## Commands
  <!-- commands -->
* [`yarn compile`](#station-compile)
* [`yarn create DOCUMENTINFO`](#station-create-documentinfo)
* [`yarn generate PROFILENAME`](#station-generate-profilename)
* [`yarn publish PATH`](#station-publish-path)

## `yarn compile`

Compiles every profile and map from capabilities directory to superface/grid directory. For now it is safer to use generate command.

```
USAGE
  $ yarn compile

OPTIONS
  -g, --generate  Generate types for compiled files.
  -h, --help      show CLI help
  -q, --quiet     When set to true, disables the shell echo output of action.

EXAMPLES
  $ yarn compile
  $ yarn compile -q
  $ yarn compile -g
  $ yarn compile --generate
```

_See code: [dist/src/commands/compile.ts](src)_

## `yarn create DOCUMENTINFO`

Creates map, profile or provider file with basic template on a local filesystem.

```
USAGE
  $ yarn create DOCUMENTINFO

ARGUMENTS
  DOCUMENTINFO  Two arguments containing informations about the document.
                1. Document Type - type of document that will be created (profile or map or provider).
                2. Document Name - name of a file that will be created

OPTIONS
  -h, --help   show CLI help
  -q, --quiet  When set to true, disables the shell echo output of action.

EXAMPLES
  $ yarn create profile sms/service
  $ yarn create profile sms/service -q
  $ yarn create map sms/service twilio
  $ yarn create provider twilio
```

_See code: [dist/src/commands/create.ts](src)_

## `yarn generate PROFILENAME`

Generates .ts files into `superface/types/{scope}` folder, creates or updates `superface/sdk.ts` file and creates or updates `superface/types/{scope}/index.d.ts` file.

```
USAGE
  $ yarn generate PROFILENAME

ARGUMENTS
  PROFILENAME  Profile name in {scope}/{usecase} shape

OPTIONS
  -h, --help   show CLI help
  -q, --quiet  When set to true, disables the shell echo output of action.

EXAMPLES
  $ yarn generate sms/service
  $ yarn generate sms/service -q
```

_See code: [dist/src/commands/generate.ts](src)_

## `yarn publish PATH`

Uploads map/profile/provider to Store - use paths to `.supr` file for profiles, `.suma` for maps and `.json` for providers. Do not use path ending with `.ast.json` (compiled files).

```
USAGE
  $ yarn publish PATH

ARGUMENTS
  PATH  Path to profile, map or provider

OPTIONS
  -h, --help        show CLI help
  -p, --production  Publish to production server.
  -q, --quiet       When set to true, disables the shell echo output of action.

EXAMPLES
  $ yarn upload capabilities/vcs/user-repos/maps/bitbucket.suma
  $ yarn upload capabilities/vcs/user-repos/maps/bitbucket.suma -p
  $ yarn upload capabilities/vcs/user-repos/maps/bitbucket.suma -q
```

_See code: [dist/src/commands/publish.ts](src)_
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
 yarn create profile {scope}/{usecase}
```
Edit created .supr file

Secondly, create new provider:

```
 yarn create provider {provider}
```

Edit created .json file

Next, create map for created profile and provider

```
 yarn create map {scope}/{usecase} {provider}
```

Edit created .suma file and test file (.test.ts)

Compile created files:

```
 yarn compile
```

Generate types if needed:

```
 yarn generate {scope}/{usecase}
```

Test created capability

```
 yarn test {path to test file}
```

Upload newly created files
```
yarn upload {path to profile}
yarn upload {path to map}
yarn upload {path to provider}
```

## Enviroment variables

Secretes used for authentication during tests are stored in `.env.capabilities` and loaded using dotenv. Run `cp .env.capabilities.example .env.capabilities` to start from the template.
