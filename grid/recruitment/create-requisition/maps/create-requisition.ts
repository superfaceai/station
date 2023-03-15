/* eslint-disable jest/no-export */
import { IMappedError } from '@superfaceai/one-sdk';
import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

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

export const createRequisitionTest = (
  provider: string,
  testInputs: {
    validRequisitionCode: string;
    existingRequisitionCode: string;
  }
) => {
  describe(`recruitment/create-requisition/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'recruitment/create-requisition',
        provider,
      });
    });

    describe('CreateRequisition', () => {
      it('should perform successfully', async () => {
        const result = await superface.run({
          useCase: 'CreateRequisition',
          input: {
            requisitionCode: testInputs.validRequisitionCode,
            name: 'Software Developer, Platform',
            headcountTotal: 2,
            employmentStatus: 'FullTime',
            status: 'Open',
            location: 'Prague',
          },
        });

        expect(() => result.unwrap()).not.toThrow();
        expect(result).toMatchSnapshot();
      });

      it('should return RequisitionCodeConflict error', async () => {
        const result = await superface.run(
          {
            useCase: 'CreateRequisition',
            input: {
              requisitionCode: testInputs.existingRequisitionCode,
              name: 'Software Developer, Platform',
              headcountTotal: 2,
              employmentStatus: 'FullTime',
              status: 'Open',
              location: 'Prague',
            },
          },
          {
            fullError: true,
          }
        );

        expect(() => result.unwrap()).toThrow();
        result.match(
          () => {},
          err => {
            expect(
              (err as IMappedError<RecruitmentError>).properties?.code
            ).toBe('RequisitionCodeConflict');
          }
        );
      });
    });

    it('should map error', async () => {
      const result = await superface.run(
        {
          useCase: 'CreateRequisition',
          input: {
            requisitionCode: 'REQ-5',
            name: 'Software Developer, Platform',
            headcountTotal: -1,
            employmentStatus: 'FullTime',
          },
        },
        {
          fullError: true,
        }
      );

      expect(() => result.unwrap()).toThrow();
      result.match(
        () => {},
        err => {
          expect((err as IMappedError<RecruitmentError>).properties?.code).toBe(
            'InvalidInput'
          );
        }
      );
    });
  });
};
