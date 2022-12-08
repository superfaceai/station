/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';
import { createProduct } from '../../create-product/maps/create-product';

export function updateProductTest(providerName: string): void {
  describe(`payments/update-product/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'payments/update-product',
        provider: providerName,
      });
    });

    describe('UpdateProduct', () => {
      describe('when all inputs are correct', () => {
        it('updates a product', async () => {
          const productId = await createProduct(providerName);
          const result = await superface.run(
            {
              useCase: 'UpdateProduct',
              input: {
                productId,
                name: 'New name',
                description: 'New description',
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
