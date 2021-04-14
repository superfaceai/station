module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ["superface"],
  coveragePathIgnorePatterns: [
    "/dist/", "/superface/"
  ]
};
