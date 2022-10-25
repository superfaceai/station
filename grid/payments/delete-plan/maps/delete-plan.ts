/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { createPlan } from '../../create-plan/maps/create-plan';

export function deletePlanTest(providerName: string): void {
  describe(`payments/delete-plan/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'payments/delete-plan',
        provider: providerName,
        testInstance: expect,
      });
    });

    describe('DeletePlan', () => {
      describe('when all inputs are correct', () => {
        it('deletes a plan', async () => {
          const id = await createPlan(providerName);
          const result = await superface.run({
            useCase: 'DeletePlan',
            input: {
              id,
            },
          });
          expect(() => result.unwrap()).not.toThrow();
          expect(result.unwrap()).toMatchSnapshot();
        });
      });
    });
  });
}
