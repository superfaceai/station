import { SuperfaceClient } from '@superfaceai/one-sdk';

const sampleCandidate = {
  jobId: 'JOB_ID',
  firstName: 'Demo',
  lastName: 'Testing',
  email: 'demo_testing@fakemail.com',
};

describe('recruitment/candidates/mock', () => {
  describe('CreateCandidate', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('recruitment/candidates');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('CreateCandidate');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(sampleCandidate, { provider });

      expect(result.isOk() && (result.value as any)).toEqual({
        id: 'CANDIDATE_ID',
        jobId: 'JOB_ID',
      });
    });
  });

  describe('GetStageChanges', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('recruitment/candidates');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('GetStageChanges');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        { candidateId: 'CANDIDATE_ID' },
        { provider }
      );

      expect(result.isOk() && (result.value as any)).toEqual({
        stages: [
          {
            id: 'sourced',
            name: 'Sourced',
            description: 'Sourced from linkedIn',
            current: false,
            createdAt: '2022-12-06T15:20:11Z',
          },
          {
            id: 'applied',
            name: 'Applied',
            description: 'Applied for job opening of Software Engineer',
            current: true,
            createdAt: '2022-12-08T10:20:42Z',
          },
        ],
      });
    });
  });
});
