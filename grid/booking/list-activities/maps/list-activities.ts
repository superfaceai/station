/* eslint-disable jest/no-export */
import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export function listActivitiesTest(provider: string) {
  describe(`booking/list-activities/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'booking/list-activities',
        provider,
      });
    });

    describe('ListActivities', () => {
      it('should perform successfully', async () => {
        const result = await superface.run({
          useCase: 'ListActivities',
          input: {},
        });

        expect(() => result.unwrap()).not.toThrow();
        expect(result).toMatchSnapshot();
      });

      it('should paginate', async () => {
        const result = await superface.run({
          useCase: 'ListActivities',
          input: {},
          testName: 'paginate-initial',
        });
        const nextPage = (result.unwrap() as { nextPage: string }).nextPage;

        if (!nextPage) {
          console.warn('No `nextPage` token returned, cannot test.');

          return;
        }

        const secondResult = await superface.run({
          useCase: 'ListActivities',
          input: {
            page: nextPage,
          },
        });

        expect(() => secondResult.unwrap()).not.toThrow();
        expect(result.unwrap()).not.toEqual(secondResult.unwrap());
        expect(secondResult).toMatchSnapshot();
      });
    });
  });
}
