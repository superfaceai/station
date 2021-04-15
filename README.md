# station
Capabilities

## Install

```
yarn install
```

## Usage

Build TS files
```
yarn build
```
set .env variables from .env.example

Compile maps and profiles
```
yarn compile
```

Create profile
```
yarn create:profile {scope}/{usecase} 
```

Create provider
```
 yarn create:provider {provider}
```

Create map
```
 yarn create:map {scope}/{usecase} {provider}
```

Test
```
yarn test
```

## Adding new capability

First, create new profile:

```
 yarn create:profile {scope}/{usecase}
```
Edit created .supr file

Secondly, create new provider:

```
 yarn create:provider {provider}
```

Edit created .json file

Next, create map for created profile and provider

```
 yarn create:map {scope}/{usecase} {provider}
```

Edit created .suma file and test file (.test.ts)

Compile created files:

```
 yarn compile
```

Test created capability

```
 yarn test
```

## Enviroment variables

Secretes used for authentication are stored in `.env.capabilities` and loaded using dotenv.
