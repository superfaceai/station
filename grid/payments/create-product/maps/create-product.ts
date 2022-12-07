/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

export async function createProduct(provider: string): Promise<string> {
  const superfaceCreateProductProfile = new SuperfaceTest(
    {
      profile: 'payments/create-product',
      provider,
    },
    nockConfig
  );
  const result = await superfaceCreateProductProfile.run(
    {
      useCase: 'CreateProduct',
      input: {
        name: 'Temporary Product',
        description: 'Used just for testing.',
        type: 'physical',
      },
      testName: 'payments/create-product/temporary',
    },
    { prepare: true }
  );

  return (result.unwrap() as { productId: string }).productId;
}

export function createProductTest(providerName: string): void {
  describe(`payments/create-product/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest(
        {
          profile: 'payments/create-product',
          provider: providerName,
        },
        nockConfig
      );
    });

    describe('CreateProduct', () => {
      describe('when all inputs are correct', () => {
        it('creates a product', async () => {
          const result = await superface.run({
            useCase: 'CreateProduct',
            input: {
              name: 'Superface milk',
              description:
                'Milk that gives you super-powers, delivered to your door.',
              type: 'physical',
            },
          });
          expect(() => result.unwrap()).not.toThrow();
          expect(result.unwrap()).toMatchSnapshot();
        });
      });
    });
  });
}
