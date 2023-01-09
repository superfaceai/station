/* eslint-disable jest/no-export */
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const updateCandidateFeaturesTest = (
  provider: string,
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/update-candidate/${provider}`, () => {
    describe('UpdateCandidateFeatures', () => {
      let superface: SuperfaceTest;

      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/update-candidate',
          provider,
          useCase: 'UpdateCandidateFeatures',
        });
      });

      it(`returns valid ${provider} features`, async () => {
        const result = await superface.run(
          {
            input: {},
          },
          options
        );

        expect(result.isOk()).toBeTruthy();
        expect(result).toMatchSnapshot();
      });
    });
  });
};
