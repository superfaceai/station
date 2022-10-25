/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { createProduct } from '../../create-product/maps/create-product';

export function updateProductTest(providerName: string): void {
  describe(`payments/update-product/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'payments/update-product',
        provider: providerName,
        testInstance: expect,
      });
    });

    describe('UpdateProduct', () => {
      describe('when all inputs are correct', () => {
        it('updates a product', async () => {
          const id = await createProduct(providerName);
          const result = await superface.run(
            {
              useCase: 'UpdateProduct',
              input: {
                id,
                name: 'New name',
                description: 'New description',
              },
            },
            {
              hideInput: ['id'],
            }
          );
          expect(() => result.unwrap()).not.toThrow();
          expect(result.unwrap()).toMatchSnapshot();
        });
      });
    });
  });
}
