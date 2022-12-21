/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const listStageChangesTest = (
  provider: string,
  jobIds: { valid: string },
  candidateIds: { valid: string; invalid: string },
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/list-stage-changes/${provider}`, () => {
    describe('ListStageChanges', () => {
      let superface: SuperfaceTest;

      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/list-stage-changes',
          provider,
          useCase: 'ListStageChanges',
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
