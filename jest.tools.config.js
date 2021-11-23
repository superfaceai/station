module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/superface/', '<rootDir>/grid'],
  coveragePathIgnorePatterns: ['/superface/'],
};
