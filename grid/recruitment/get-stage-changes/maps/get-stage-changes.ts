/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const getStageChangesTest = (
  provider: string,
  jobIds: { valid: string },
  candidateIds: { valid: string; invalid: string },
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/get-stage-changes/${provider}`, () => {
    describe('GetStageChanges', () => {
      let superface: SuperfaceTest;

      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/get-stage-changes',
          provider,
          useCase: 'GetStageChanges',
        });
      });

      describe('when specified candidate does exist', () => {
        it('performs correctly', async () => {
          const input =
            provider === 'breezy-hr'
              ? {
                  candidateId: candidateIds.valid,
                  jobId: jobIds.valid,
                }
              : {
                  candidateId: candidateIds.valid,
                };

          const result = await superface.run({ input }, options);

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });

      describe('when specified candidate does not exist', () => {
        it('returns error', async () => {
          const input =
            provider === 'breezy-hr'
              ? {
                  candidateId: candidateIds.invalid,
                  jobId: jobIds.valid,
                }
              : {
                  candidateId: candidateIds.invalid,
                };

          await expect(
            superface.run({ input }, options)
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
