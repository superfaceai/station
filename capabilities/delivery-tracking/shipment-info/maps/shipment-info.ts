/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing-lib';

export const shipmentInfoTest = (
  provider: string,
  testVectors: {
    input: { trackingNumber: string; carrier?: string };
    describe: string;
    expectedResult: string;
  }[]
): void => {
  describe(`delivery-tracking/shipment-info/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest();
    });

    describe('ShipmentInfo', () => {
      testVectors.forEach(testVector => {
        describe(testVector.describe, () => {
          it(testVector.expectedResult, async () => {
            await expect(
              superface.run({
                profile: 'delivery-tracking/shipment-info',
                provider,
                useCase: 'ShipmentInfo',
                input: testVector.input,
              })
            ).resolves.toMatchSnapshot();
          });
        });
      });
    });
  });
};
