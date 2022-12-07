/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';
import { nockConfig } from '../../../test-config';

export function listProductsTest(providerName: string): void {
  describe(`payments/read-products/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest(
        {
          profile: 'payments/read-products',
          provider: providerName,
        },
        nockConfig
      );
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
