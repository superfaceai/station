/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';
import { createPlan } from '../../create-plan/maps/create-plan';

export function deletePlanTest(providerName: string): void {
  describe(`payments/delete-plan/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'payments/delete-plan',
        provider: providerName,
      });
    });

    describe('DeletePlan', () => {
      describe('when all inputs are correct', () => {
        it('deletes a plan', async () => {
          const planId = await createPlan(providerName);
          const result = await superface.run(
            {
              useCase: 'DeletePlan',
              input: {
                planId,
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
