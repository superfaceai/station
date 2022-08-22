module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  runner: 'groups',
  reporters: ['default', './dist/reporter.js']
};
