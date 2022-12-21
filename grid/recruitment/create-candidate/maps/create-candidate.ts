/* eslint-disable jest/no-export, jest/valid-describe, jest/valid-title, jest/no-identical-title */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';
import { readFileSync } from 'fs';

import { buildSuperfaceTest } from '../../../test-config';

const sampleCandidate = {
  name: 'John Doe',
  firstName: 'John',
  lastName: 'Doe',

  email: 'john.doe@fakemail.com',
  phone: '1-859-557-6573',
  address: '25772 Gustave Shore, Iowa, USA',

  education: [
    {
      degree: 'MBA',
      school: 'University of Pennsylvania',
      fieldOfStudy: null,
      startedAt: '2008-03-01',
      endedAt: '2011-03-30',
    },
    {
      degree: 'B.S.',
      school: 'University of Chicago',
      fieldOfStudy: 'Marketing Communication & Economics',
      startedAt: '2004-09-01',
      endedAt: '2007-03-30',
    },
  ],

  workExperience: [
    {
      position: 'Sales Director',
      summary: 'Summary of a work experience at Test Company',
      company: 'Test Company',
      industry: 'Telecommunications',
      current: false,
      startedAt: '2011-03-01',
      endedAt: '2014-03-30',
    },
  ],

  cv: {
    name: 'cv-sample.pdf',
    data: readFileSync('./grid/recruitment/cv-sample.pdf', {
      encoding: 'base64',
    }),
  },

  links: [
    {
      name: 'twitter',
      url: 'https://twitter.com/candidate.username',
    },
    {
      name: 'Portfolio',
      url: 'https://url.to.portfolio',
    },
  ],
};

const describeIf = (
  condition: boolean,
  ...args: Parameters<jest.Describe>
): void => (condition ? describe(...args) : describe.skip(...args));

export const createCandidateTest = (
  provider: string,
  jobIds: { valid: string; invalid: string },
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/create-candidate/${provider}`, () => {
    describe('CreateCandidate', () => {
      let superface: SuperfaceTest;

      beforeAll(() => {
        jest.setTimeout(10000);
        superface = buildSuperfaceTest({
          profile: 'recruitment/create-candidate',
          provider,
          useCase: 'CreateCandidate',
        });
      });

      describe('when specified job does exist', () => {
        it('performs correctly', async () => {
          const result = await superface.run(
            {
              input: {
                jobId: jobIds.valid,
                ...sampleCandidate,
              },
            },
            options
          );

          expect(result.isOk()).toBeTruthy();
          expect(result).toMatchSnapshot();
        });
      });

      describe('when specified job does not exist', () => {
        it('returns error', async () => {
          const result = await superface.run(
            {
              input: {
                jobId: jobIds.invalid,
                firstName: 'Demo',
                lastName: 'Testing',
                email: 'demo_testing@fakemail.com',
              },
            },
            options
          );

          expect(() => result.unwrap()).toThrow();
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
                  jobId: jobIds.valid,
                  firstName: 'Demo',
                  lastName: 'Testing',
                  email: 'demo_testing@fakemail.com',
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
                  jobId: jobIds.valid,
                  firstName: 'Demo',
                  lastName: 'Testing',
                  email: 'demo_testing@fakemail.com',
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
