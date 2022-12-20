/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const listCompaniesTest = (
  provider: string,
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/list-companies/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('ListCompanies', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/list-companies',
          provider,
          useCase: 'ListCompanies',
        });
      });

      it('performs correctly', async () => {
        const result = await superface.run({ input: {} }, options);

        expect(() => result.unwrap()).not.toThrow();
        expect(result).toMatchSnapshot();
      });
    });
  });
};
