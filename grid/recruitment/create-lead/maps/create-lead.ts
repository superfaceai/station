/* eslint-disable jest/no-export, jest/valid-describe-callback, jest/valid-title, jest/no-identical-title */

import { BinaryData, IMappedError } from '@superfaceai/one-sdk';
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

const sampleLead = {
  name: 'John Lead',
  firstName: 'John',
  lastName: 'Lead',

  email: 'john.lead@fakemail.com',
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
    mimeType: 'application/pdf',
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

  source: ['LinkedIn', 'Indeed', 'Glassdoor'],
};

type Error = {
  title: string;
  detail?: unknown;
  code: string;
  rateLimit?: {
    bucket?: string;
    totalRequests?: number;
    remainingRequests?: number;
    remainingRequestsPercentage?: number;
    resetTimestam?: number;
  };
};

export const createLeadTest = (
  provider: string,
  jobIds: { valid: string; invalid: string },
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/create-lead/${provider}`, () => {
    let superface: SuperfaceTest;
    const JEST_TIMEOUT = 20 * 1000;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'recruitment/create-lead',
        provider,
      });
    });

    describe('CreateLead', () => {
      describe('when specified job does exist', () => {
        it(
          'should perform successfully',
          async () => {
            const result = await superface.run(
              {
                useCase: 'CreateLead',
                input: {
                  jobId: jobIds.valid,
                  ...sampleLead,
                },
              },
              options
            );

            expect(() => result.unwrap()).not.toThrow();
            expect(result).toMatchSnapshot();
          },
          JEST_TIMEOUT
        );
      });

      describe('when specified job does not exist', () => {
        it('should map error', async () => {
          const result = await superface.run(
            {
              useCase: 'CreateLead',
              input: {
                jobId: jobIds.invalid,
                firstName: 'Demo',
                lastName: 'Testing',
                email: 'demo_testing@fakemail.com',
              },
            },
            {
              fullError: true,
              ...options,
            }
          );

          expect(() => result.unwrap()).toThrow();
          result.match(
            () => {},
            err => {
              expect(
                (err as unknown as IMappedError<Error>).properties?.code
              ).toBe('JobNotFound');
            }
          );
        });
      });
    });
  });
};

export const createLeadBreezyHRSpecificTest = (
  options?: RecordingProcessOptions
): void => {
  const provider = 'breezy-hr';

  describe(`recruitment/create-lead/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('CreateLead', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/create-lead',
          provider,
          useCase: 'CreateLead',
        });
      });

      describe('when specified company does not exist', () => {
        let companyId: string | undefined;

        beforeAll(() => {
          companyId = process.env.BREEZY_HR_COMPANY_ID;

          process.env.BREEZY_HR_COMPANY_ID = '1b111c1111ef11';
        });

        afterAll(() => {
          process.env.BREEZY_HR_COMPANY_ID = companyId;
        });

        it('should map error', async () => {
          const result = await superface.run(
            {
              useCase: 'CreateLead',
              input: {
                jobId: 'JOB_ID',
                firstName: 'Demo',
                lastName: 'Testing',
                email: 'demo_testing@fakemail.com',
              },
            },
            {
              fullError: true,
              ...options,
            }
          );

          expect(() => result.unwrap()).toThrow();
          result.match(
            () => {},
            err => {
              expect((err as IMappedError<Error>).properties?.code).toBe(
                'WrongIntegrationParameter'
              );
            }
          );
        });
      });
    });
  });
};

export const createLeadWorkableSpecificTest = (
  options?: RecordingProcessOptions
): void => {
  const provider = 'workable';

  describe(`recruitment/create-lead/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('CreateLead', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/create-lead',
          provider,
          useCase: 'CreateLead',
        });
      });

      describe('when specified subdomain does not exist', () => {
        let subdomain: string | undefined;

        beforeAll(() => {
          subdomain = process.env.WORKABLE_SUBDOMAIN;

          process.env.WORKABLE_SUBDOMAIN = 'invalid-subdomain';
        });

        afterAll(() => {
          process.env.WORKABLE_SUBDOMAIN = subdomain;
        });

        it('returns error', async () => {
          const result = await superface.run(
            {
              useCase: 'CreateLead',
              input: {
                jobId: 'JOB_ID',
                firstName: 'Demo',
                lastName: 'Testing',
                email: 'demo_testing@fakemail.com',
              },
            },
            {
              fullError: true,
              ...options,
            }
          );

          expect(() => result.unwrap()).toThrow();
          result.match(
            () => {},
            err => {
              expect((err as IMappedError<Error>).properties?.code).toBe(
                'WrongIntegrationParameter'
              );
            }
          );
        });
      });
    });
  });
};
