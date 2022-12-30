import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('recruitment/list-jobs/mock', () => {
  describe('ListJobs', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('recruitment/list-jobs');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('ListJobs');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform({}, { provider });

      expect(result.isOk() && (result.value as any)).toEqual({
        jobs: [
          {
            id: 'JOB_ID',
            name: 'Software engineer',
            description:
              'We are looking for a Software Engineer who will assist us with design, development and installation of software solutions. Your duties will include development, writing code, and documenting functionality.',
          },
        ],
      });
    });
  });
});
