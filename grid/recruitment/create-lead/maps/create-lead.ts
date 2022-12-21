/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';
import { readFileSync } from 'fs';

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

  source: ['LinkedIn', 'Indeed', 'Glassdoor'],
};

export const createLeadTest = (
  provider: string,
  jobIds: { valid: string; invalid: string },
  options?: RecordingProcessOptions
): void => {
  describe(`recruitment/create-lead/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'recruitment/create-lead',
        provider,
      });
    });

    describe('CreateLead', () => {
      it('should perform successfully', async () => {
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
      });

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
          options
        );

        expect(() => result.unwrap()).toThrow();
        expect(result).toMatchSnapshot();
      });
    });
  });
};
