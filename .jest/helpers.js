const { SuperfaceTest } = require('@superfaceai/testing');

function buildSuperfaceTest(options) {
  return new SuperfaceTest(options, {
    testInstance: expect,
  });
}

(() => {
  global.buildSuperfaceTest = buildSuperfaceTest;
})();
