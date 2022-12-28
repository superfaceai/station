/* eslint-disable jest/no-export, jest/valid-describe, jest/valid-title, jest/no-identical-title */

import { BinaryData } from '@superfaceai/one-sdk';
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

// eslint-disable-next-line @typescript-eslint/ban-types
type Candidate = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  cv?: {
    fileName: string;
    data: BinaryData;
  };
  education: {
    degree: string;
    school: string;
    fieldOfStudy: string | null;
    startedAt: string;
    endedAt: string;
  }[];
  workExperience: {
    position: string;
    summary: string;
    company: string;
    industry: string;
    current: boolean;
    startedAt: string;
    endedAt: string;
  }[];
  links?: {
    name: string;
    url: string;
  }[];
};

const buildSampleCandidate = (): Candidate => {
  return {
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
      fileName: 'cv-sample.pdf',
      data: BinaryData.fromPath('./grid/recruitment/cv-sample.pdf'),
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
      let sampleCandidate: Candidate;

      beforeEach(() => {
        jest.setTimeout(10000);
        sampleCandidate = buildSampleCandidate();
        superface = buildSuperfaceTest({
          profile: 'recruitment/create-candidate',
          provider,
          useCase: 'CreateCandidate',
        });
      });

      describe('when specified job does exist', () => {
        describe('when unsupported CV file MIME type used', () => {
          it('returns CVMIMETypeNotSupported error', async () => {
            await expect(
              superface.run(
                {
                  input: {
                    jobId: jobIds.valid,
                    ...sampleCandidate,
                    cv: {
                      ...sampleCandidate.cv,
                      fileName: 'cv-sample.xml',
                    },
                  },
                },
                options
              )
            ).resolves.toMatchSnapshot();
          });
        });

        describe('when CV file name is missing', () => {
          it('returns CVFileNameRequired error', async () => {
            await expect(
              superface.run(
                {
                  input: {
                    jobId: jobIds.valid,
                    ...sampleCandidate,
                    cv: {
                      ...sampleCandidate.cv,
                      fileName: undefined,
                    },
                  },
                },
                options
              )
            ).resolves.toMatchSnapshot();
          });
        });

        describe('when valid inputs passed', () => {
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
          let companyId: string | undefined;

          beforeAll(() => {
            companyId = process.env.BREEZY_HR_COMPANY_ID;

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
          let subdomain: string | undefined;

          beforeAll(() => {
            subdomain = process.env.WORKABLE_SUBDOMAIN;

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
