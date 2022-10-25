/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { createProduct } from '../../create-product/maps/create-product';

export async function createPlan(provider: string): Promise<string> {
  const productId = await createProduct(provider);

  const superfacePublishingProfiles = new SuperfaceTest({
    profile: 'payments/create-plan',
    provider,
  });
  const result = await superfacePublishingProfiles.run(
    {
      useCase: 'CreatePlan',
      input: {
        productId,
        name: 'Temporary Plan',
        interval: 'month',
        price: 1234,
        currency: 'USD',
      },
      testName: 'payments/create-plan/temporary',
    },
    {
      hideInput: ['productId'],
    }
  );

  return (result.unwrap() as { id: string }).id;
}

export function createPlanTest(providerName: string): void {
  describe(`payments/create-plan/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'payments/create-plan',
        provider: providerName,
        testInstance: expect,
      });
    });

    describe('CreatePlan', () => {
      describe('when all inputs are correct', () => {
        it('creates a plan for a product', async () => {
          const productId = await createProduct(providerName);
          const result = await superface.run(
            {
              useCase: 'CreatePlan',
              input: {
                productId,
                name: 'A Man, A Plan, A Canal, Panama',
                interval: 'month',
                price: 1234,
                currency: 'USD',
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
