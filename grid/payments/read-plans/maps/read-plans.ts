/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';
import { createPlan } from '../../create-plan/maps/create-plan';

export function getPlanTest(providerName: string): void {
  describe(`payments/read-plans/get/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'payments/read-plans',
        provider: providerName,
      });
    });

    describe('GetPlan', () => {
      describe('when plan exists', () => {
        it('gets a plan', async () => {
          const planId = await createPlan(providerName);
          const result = await superface.run(
            {
              useCase: 'GetPlan',
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

export function listPlansTest(providerName: string): void {
  describe(`payments/read-plans/list/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'payments/read-plans',
        provider: providerName,
      });
    });

    describe('ListPlans', () => {
      describe('when all inputs are correct', () => {
        it('lists all plans', async () => {
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
