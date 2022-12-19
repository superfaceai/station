import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('recruitment/get-stage-changes/mock', () => {
  describe('GetStageChanges', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('recruitment/get-stage-changes');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('GetStageChanges');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        { candidateId: 'CANDIDATE_ID' },
        { provider }
      );

      expect(result.isOk() && (result.value as any)).toEqual({
        changes: [
          {
            id: '1',
            stageId: 'sourced',
            name: 'Sourced',
            description: 'Sourced from LinkedIn',
            current: false,
            createdAt: '2022-12-06T15:20:11Z',
          },
          {
            id: '2',
            stageId: 'applied',
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
