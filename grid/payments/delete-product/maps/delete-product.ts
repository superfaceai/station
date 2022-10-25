/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { createProduct } from '../../create-product/maps/create-product';

export function deleteProductTest(providerName: string): void {
  describe(`payments/delete-product/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'payments/delete-product',
        provider: providerName,
        testInstance: expect,
      });
    });

    describe('DeleteProduct', () => {
      describe('when all inputs are correct', () => {
        it('deletes a product', async () => {
          const id = await createProduct(providerName);
          const result = await superface.run(
            {
              useCase: 'DeleteProduct',
              input: {
                id,
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
