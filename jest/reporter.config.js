const tsNode = require('ts-node');

tsNode.register({
  transpileOnly: true,
  compilerOptions: require('../tsconfig').compilerOptions,
});

const Reporter = require('../src/reporter/reporter');

module.exports = Reporter;
