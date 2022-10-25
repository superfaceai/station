/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

export function listProductsTest(providerName: string): void {
  describe(`payments/list-products/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'payments/list-products',
        provider: providerName,
        testInstance: expect,
      });
    });

    describe('ListProducts', () => {
      describe('when all inputs are correct', () => {
        it('creates a product', async () => {
          const result = await superface.run({
            useCase: 'ListProducts',
            input: {},
          });
          expect(() => result.unwrap()).not.toThrow();
          expect(result.unwrap()).toMatchSnapshot();
        });
      });
    });
  });
}
