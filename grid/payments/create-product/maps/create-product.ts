/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';
import { RecordingType } from '@superfaceai/testing/dist/nock/recording.interfaces';

import { buildSuperfaceTest } from '../../../test-config';

export async function createProduct(provider: string): Promise<string> {
  const superfaceCreateProductProfile = buildSuperfaceTest({
    profile: 'payments/create-product',
    provider,
  });
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
    { recordingType: RecordingType.PREPARE }
  );

  return (result.unwrap() as { productId: string }).productId;
}

export function createProductTest(providerName: string): void {
  describe(`payments/create-product/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'payments/create-product',
        provider: providerName,
      });
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
