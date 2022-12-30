/* eslint-disable jest/no-export, jest/valid-describe, jest/valid-title, jest/no-identical-title */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

const describeIf = (
  condition: boolean,
  ...args: Parameters<jest.Describe>
): void => (condition ? describe(...args) : describe.skip(...args));

export const listJobsTest = (
  provider: string,
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/list-jobs/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('ListJobs', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/list-jobs',
          provider,
          useCase: 'ListJobs',
        });
      });

      describe('when searching for published jobs', () => {
        it('performs correctly', async () => {
          const result = await superface.run(
            {
              input: {
                state: 'published',
              },
              testName: 'list published jobs',
            },
            options
          );

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });

      describe('when searching for draft jobs', () => {
        it('performs correctly', async () => {
          const result = await superface.run(
            {
              input: {
                state: 'draft',
              },
              testName: 'list draft jobs',
            },
            options
          );

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
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
                  state: 'published',
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
                  state: 'published',
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
