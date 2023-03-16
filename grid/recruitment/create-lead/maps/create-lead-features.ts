/* eslint-disable jest/no-export */
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const createLeadFeaturesTest = (
  provider: string,
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/create-lead/${provider}`, () => {
    describe('CreateLeadFeatures', () => {
      let superface: SuperfaceTest;

      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/create-lead',
          provider,
          useCase: 'CreateLeadFeatures',
        });
      });

      it(`returns valid ${provider} features`, async () => {
        const result = await superface.run(
          {
            input: {},
          },
          options
        );

        expect(() => result.unwrap()).not.toThrow();
        expect(result).toMatchSnapshot();
      });
    });
  });
};
