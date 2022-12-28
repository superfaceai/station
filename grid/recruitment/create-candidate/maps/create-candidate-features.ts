/* eslint-disable jest/no-export */
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const createCandidateFeaturesTest = (
  provider: string,
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/create-candidate/${provider}`, () => {
    describe('CreateCandidateFeatures', () => {
      let superface: SuperfaceTest;

      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/create-candidate',
          provider,
          useCase: 'CreateCandidateFeatures',
        });
      });

      it(`returns valid ${provider} features`, async () => {
        const result = await superface.run(
          {
            input: {}
          },
          options
        );

        expect(result.isOk()).toBeTruthy();
        expect(result).toMatchSnapshot();
      });
    });
  });
};
