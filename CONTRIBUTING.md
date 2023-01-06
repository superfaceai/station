# How to contribute to Superface Station

We welcome contributions to our [open source project on GitHub](https://github.com/superfaceai/station).

**Please open an issue first if you want to make larger changes**

## Introduction

We are glad that you are interested in Superface in the way of contributing. We value the pro-community developers as you are.

## Help the community

1. Report an Error or a Bug
2. Contribute to the Documentation
3. Provide Support on Issues

## Need help?

If you have any question about this project (for example, how to use it) or if you just need some clarification about anything, please open an Issue at [Issues](https://github.com/superfaceai/station/issues).

## Contributing

Follow these steps:

1. **Fork & Clone** the repository
2. **Setup** the Station
   - [Installation](README.md#install)
   - [Usage](README.md#usage)
3. **Commit** changes to your own branch by convention. See https://www.conventionalcommits.org/en/v1.0.0/
4. **Push** your work back up to your fork
5. Submit a **Pull Request** so that we can review your changes

**NOTE: Be sure to merge the latest from "upstream" before making a pull request.**

**NOTE: Please open an issue first if you want to make larger changes**

### Contribute by adding use-case

For help with authoring new use-case see [Superface documentation](https://superface.ai/docs/guides/create-new-capability).

In Station we want to keep use-cases which are consistent and in great quality. To achieve it, set of [convetions](CONVENTIONS) were created.

### Contribute by reporting bugs

If you are experiencing bug or undocumented behavior please open an Issue with bug template at [Issues](https://github.com/superfaceai/station/issues).

### Contribute to documentation

Help us improve Superface documentation, you can report typos, improve examples.

**NOTE: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.**

## Testing

Jest in station is configured to run tests inside `/grid` folder by default. Multiple ways of testing are described bellow, but all of them work with either basic jest setup:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './grid',
};
```

or with more complex setup containing custom reporter and runner to filter which tests to run (mainly used for tagging tests ready to continuous testing):

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './grid',
  runner: 'groups',
  reporters: ['default', '../jest/reporter.config.js'],
  setupFilesAfterEnv: ['../jest/setup.config.js'],
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

## Copyright and Licensing

The Superface Station open source project is licensed under the [MIT License](LICENSE).
