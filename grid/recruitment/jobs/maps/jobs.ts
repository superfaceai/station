/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

export const jobsTest = (
  provider: string,
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/jobs/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('ListJobs', () => {
      beforeAll(() => {
        superface = new SuperfaceTest(
          {
            profile: 'recruitment/jobs',
            provider,
            useCase: 'ListJobs',
          },
          nockConfig
        );
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

          expect(result.isOk).toBeTruthy();
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

          expect(result.isOk).toBeTruthy();
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
