/* eslint-disable jest/no-export, jest/valid-describe-callback, jest/valid-title, jest/no-identical-title */

import { BinaryData, IMappedError } from '@superfaceai/one-sdk';
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

type Candidate = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  cv?: {
    fileName: string;
    mimeType: string;
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

type RecruitmentError = {
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

const buildSampleCandidate = (): Candidate => {
  return {
    name: 'Joan Doe',
    firstName: 'Joan',
    lastName: 'D',

    email: 'joan.d@fakemail.com',
    phone: '1-859-557-0000',
    address: '25777 Gustave Shore, Iowa, USA',

    education: [
      {
        degree: 'MBA',
        school: 'University of Pennsylvania',
        fieldOfStudy: null,
        startedAt: '2008-03-02',
        endedAt: '2011-04-30',
      },
      {
        degree: 'B.S.',
        school: 'University of Chicago',
        fieldOfStudy: 'Marketing Communication & Economics',
        startedAt: '2004-09-02',
        endedAt: '2007-04-30',
      },
    ],

    workExperience: [
      {
        position: 'Sales Director',
        summary: 'Summary of a work experience at Acme Company',
        company: 'Acme',
        industry: 'Education',
        current: false,
        startedAt: '2011-03-01',
        endedAt: '2014-03-30',
      },
    ],

    cv: {
      fileName: 'cv-sample1.pdf',
      mimeType: "application/pdf",
      data: BinaryData.fromPath('./grid/recruitment/cv-sample.pdf'),
    },

    links: [
      {
        name: 'twitter',
        url: 'https://twitter.com/acme-candidate',
      },
    ],
  };
};

export const updateCandidateTest = (
  provider: string,
  candidateIds: { validCandidateId: string; invalidCandidateId: string },
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/update-candidate/${provider}`, () => {
    describe('UpdateCandidate', () => {
      let superface: SuperfaceTest;
      let sampleCandidate: Candidate;

      beforeEach(() => {
        jest.setTimeout(10000);
        sampleCandidate = buildSampleCandidate();
        superface = buildSuperfaceTest({
          profile: 'recruitment/update-candidate',
          provider,
          useCase: 'UpdateCandidate',
        });
      });

      describe('when specified job does exist', () => {
        describe('when CV file with unsupported MIME type used', () => {
          it('returns CVMIMETypeNotSupported error', async () => {
            const result = await superface.run(
              {
                input: {
                  candidateId: candidateIds.validCandidateId,
                  ...sampleCandidate,
                  cv: {
                    ...sampleCandidate.cv,
                    mimeType: "unsupported/type",
                    fileName: 'cv-sample.xyz',
                  },
                },
              },
              { fullError: true, ...options }
            );
            expect(() => result.unwrap()).toThrow();
            result.match(
              () => {},
              err => {
                expect(
                  (err as IMappedError<RecruitmentError>).properties?.code
                ).toBe('CVMIMETypeNotSupported');
              }
            );
          });
        });

        describe('when CV file name is missing', () => {
          it('returns CVFileNameRequired error', async () => {
            const result = await superface.run(
              {
                input: {
                  candidateId: candidateIds.validCandidateId,
                  ...sampleCandidate,
                  cv: {
                    ...sampleCandidate.cv,
                    fileName: undefined,
                  },
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
                  (err as IMappedError<RecruitmentError>).properties?.code
                ).toBe('CVFileNameRequired');
              }
            );
          });
        });

        describe('when valid inputs passed', () => {
          it('performs correctly', async () => {
            const input = {
              candidateId: candidateIds.validCandidateId,
              ...sampleCandidate,
            };
            const result = await superface.run(
              {
                input,
              },
              options
            );
            expect(() => result.unwrap()).not.toThrow();
            expect(result).toMatchSnapshot();
          });
        });
      });

      describe('when specified candidate ID does not exist', () => {
        it('returns error', async () => {
          const result = await superface.run(
            {
              input: {
                candidateId: candidateIds.invalidCandidateId,
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
    });
  });
};

export const updateCandidateWorkableSpecificTest = (
  options?: RecordingProcessOptions
): void => {
  const provider = 'workable';

  describe(`recruitment/update-candidate/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('UpdateCandidate', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/update-candidate',
          provider,
          useCase: 'UpdateCandidate',
        });
      });

      describe('when specified subdomain does not exist', () => {
        let subdomain: string | undefined;

        beforeAll(() => {
          subdomain = process.env.WORKABLE_SUBDOMAIN;

          process.env.WORKABLE_SUBDOMAIN = 'invalid-superface';
        });

        afterAll(() => {
          process.env.WORKABLE_SUBDOMAIN = subdomain;
        });

        it('returns integration parameter error', async () => {
          const result = await superface.run(
            {
              input: {
                candidateId: 'CANDIDATE_ID',
                firstName: 'John',
              },
            },
            options
          );

          expect(() => result.unwrap()).toThrow();
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
