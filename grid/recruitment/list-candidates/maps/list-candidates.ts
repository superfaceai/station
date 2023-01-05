/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const listCandidatesTest = (
  provider: string,
  testInputs: {
    validJobId: string;
    invalidJobId: string;
  },
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/list-candidates/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('ListCandidates', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/list-candidates',
          provider,
          useCase: 'ListCandidates',
        });
      });

      describe('when searching for candidates with valid job ID', () => {
        it('returns list of candidates', async () => {
          const result = await superface.run(
            {
              input: {
                jobId: testInputs.validJobId,
              },
              testName: 'list candidates with valid job ID',
            },
            options
          );

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });

      describe('when searching for candidates with invalid job ID', () => {
        it('returns list of candidates', async () => {
          const result = await superface.run(
            {
              input: {
                jobId: testInputs.invalidJobId,
              },
              testName: 'list candidates with invalid job ID',
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

export const listCandidatesBreezyHRSpecificTest = (
  options?: RecordingProcessOptions
): void => {
  const provider = 'breezy-hr';

  describe(`recruitment/list-candidates/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('ListCandidates', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'recruitment/list-candidates',
          provider,
          useCase: 'ListCandidates',
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
