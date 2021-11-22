module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/superface/', '<rootDir>/capabilities'],
  coveragePathIgnorePatterns: ['/superface/'],
};
