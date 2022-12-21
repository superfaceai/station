/* eslint-disable jest/no-export, jest/valid-describe, jest/valid-title, jest/no-identical-title */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

const describeIf = (
  condition: boolean,
  ...args: Parameters<jest.Describe>
): void => (condition ? describe(...args) : describe.skip(...args));

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

      describeIf(
        provider === 'breezy-hr',
        'when specified company does not exist',
        () => {
          let companyId: string;

          beforeAll(() => {
            companyId = process.env.BREEZY_HR_COMPANY_ID!;

            process.env.BREEZY_HR_COMPANY_ID = '1b111c1111ef11';
          });

          afterAll(() => {
            process.env.BREEZY_HR_COMPANY_ID = companyId;
          });

          it('returns error', async () => {
            const result = await superface.run(
              {
                input: {
                  candidateId: candidateIds.valid,
                  jobId: jobIds.valid,
                },
              },
              options
            );

            expect(() => result.unwrap()).toThrow();
            expect(result).toMatchSnapshot();
          });
        }
      );

      describeIf(
        provider === 'workable',
        'when specified subdomain does not exist',
        () => {
          let subdomain: string;

          beforeAll(() => {
            subdomain = process.env.WORKABLE_SUBDOMAIN!;

            process.env.WORKABLE_SUBDOMAIN = 'invalid-superface';
          });

          afterAll(() => {
            process.env.WORKABLE_SUBDOMAIN = subdomain;
          });

          it('returns error', async () => {
            const result = await superface.run(
              {
                input: {
                  candidateId: candidateIds.valid,
                  jobId: jobIds.valid,
                },
              },
              options
            );

            expect(() => result.unwrap()).toThrow();
            expect(result).toMatchSnapshot();
          });
        }
      );
    });
  });
};
