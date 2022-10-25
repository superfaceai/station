/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { createPlan } from '../../create-plan/maps/create-plan';

export function getPlanTest(providerName: string): void {
  describe(`payments/get-plan/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'payments/get-plan',
        provider: providerName,
        testInstance: expect,
      });
    });

    describe('GetPlan', () => {
      describe('when plan exists', () => {
        it('gets a plan', async () => {
          const id = await createPlan(providerName);
          const result = await superface.run({
            useCase: 'GetPlan',
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
