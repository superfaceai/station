/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';
import { createProduct } from '../../create-product/maps/create-product';

export function deleteProductTest(providerName: string): void {
  describe(`payments/delete-product/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'payments/delete-product',
        provider: providerName,
      });
    });

    describe('DeleteProduct', () => {
      describe('when all inputs are correct', () => {
        it('deletes a product', async () => {
          const productId = await createProduct(providerName);
          const result = await superface.run(
            {
              useCase: 'DeleteProduct',
              input: {
                productId,
              },
            },
            {
              hideInput: ['productId'],
            }
          );
          expect(() => result.unwrap()).not.toThrow();
          expect(result.unwrap()).toMatchSnapshot();
        });
      });
    });
  });
}
