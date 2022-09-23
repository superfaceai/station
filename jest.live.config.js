module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './grid',
  runner: 'groups',
  reporters: ['default', '../dist/reporter.js'],
  setupFiles: ['../jest/helpers.js'],
  setupFilesAfterEnv: ['../jest/setup.js'],
};
