/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

const sampleCandidate = {
  name: 'John Doe',
  firstName: 'Demo',
  lastName: 'Testing',

  email: 'demo_testing@fakemail.com',
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
    name: 'demo_testing.doc',
    data: '6622116356e175ed0394b0d==',
  },

  links: [
    {
      name: 'Portfolio',
      url: 'https://url.to.portfolio',
    },
  ],
};

export const candidatesTest = (
  provider: string,
  jobIds: { valid: string; invalid: string },
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/candidates/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('CreateCandidate', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'recruitment/candidates',
          provider,
          useCase: 'CreateCandidate',
          testInstance: expect,
        });
      });

      describe('when specified job does exist', () => {
        it('performs correctly', async () => {
          const page1 = await superface.run(
            {
              input: {
                jobId: jobIds.valid,
                ...sampleCandidate,
              },
              testName: 'page 1',
            },
            options
          );

          expect(page1.isOk).toBeTruthy();
          expect(page1).toMatchSnapshot();
        });
      });

      describe('when specified job does not exist', () => {
        it('returns error', async () => {
          await expect(
            superface.run(
              {
                input: {
                  jobId: jobIds.invalid,
                  ...sampleCandidate,
                },
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
