/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

export function listPlansTest(providerName: string): void {
  describe(`payments/list-plans/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'payments/list-plans',
        provider: providerName,
        testInstance: expect,
      });
    });

    describe('ListPlans', () => {
      describe('when all inputs are correct', () => {
        it('creates a product', async () => {
          const result = await superface.run({
            useCase: 'ListPlans',
            input: {},
          });
          expect(() => result.unwrap()).not.toThrow();
          expect(result.unwrap()).toMatchSnapshot();
        });
      });
    });
  });
}
