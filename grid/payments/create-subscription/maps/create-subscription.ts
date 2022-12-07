/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';
import { createPlan } from '../../create-plan/maps/create-plan';

export function createSubscriptionTest(
  providerName: string,
  customer: string
): void {
  describe(`payments/create-subscription/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest(
        {
          profile: 'payments/create-subscription',
          provider: providerName,
        },
        nockConfig
      );
    });

    describe('CreateSubscription', () => {
      describe('when all inputs are correct', () => {
        it('creates a subscription for a product', async () => {
          const planId = await createPlan(providerName);
          const result = await superface.run(
            {
              useCase: 'CreateSubscription',
              input: {
                planId,
                customer,
              },
            },
            {
              hideInput: ['planId'],
            }
          );
          expect(() => result.unwrap()).not.toThrow();
          expect(result.unwrap()).toMatchSnapshot();
        });
      });
    });
  });
}
