/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const getCVTest = (
  provider: string,
  testInputs: {
    validCandidateId: string;
    invalidCandidateIds: string[];
  },
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/get-cv/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetCV', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/get-cv',
          provider,
          useCase: 'GetCV',
        });
      });

      describe('when getting a CV with a valid candidate ID', () => {
        it('returns the CV document', async () => {
          const result = await superface.run(
            {
              input: {
                candidateId: testInputs.validCandidateId,
              },
              testName: 'get CV with valid candidate ID',
            },
            options
          );

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });

      testInputs.invalidCandidateIds.forEach(invalidCandidateId => {
        describe(`when getting a CV with an invalid candidate ID ${invalidCandidateId}`, () => {
          it('returns candidate not found error', async () => {
            const result = await superface.run(
              {
                input: {
                  candidateId: invalidCandidateId,
                },
                testName: `get CV with invalid candidate ID ${invalidCandidateId}`,
              },
              options
            );

            expect(() => result.unwrap()).toThrow();
            expect(result).toMatchSnapshot();
          });
        });
      });
    });
  });
};

export const getCVWorkableSpecificTest = (
  options?: RecordingProcessOptions
): void => {
  const provider = 'workable';

  describe(`recruitment/get-cv/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetCV', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/get-cv',
          provider,
          useCase: 'GetCV',
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
              input: {
                candidateId: 'CANDIDATE_ID',
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
