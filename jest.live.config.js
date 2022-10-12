module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './grid',
  runner: 'groups',
  reporters: ['default', '../jest/reporter.config.js'],
  setupFilesAfterEnv: ['../jest/setup.config.js'],
};
