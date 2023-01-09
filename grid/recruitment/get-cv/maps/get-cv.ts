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

      describe('when geting CV with valid candidate ID', () => {
        it('returns list of candidates', async () => {
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
        describe(`when geting CV with invalid candidate ID ${invalidCandidateId}`, () => {
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

export const listCandidatesBreezyHRSpecificTest = (
  options?: RecordingProcessOptions
): void => {
  const provider = 'breezy-hr';

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

      describe('when specified company does not exist', () => {
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
                jobId: 'JOB_ID',
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

