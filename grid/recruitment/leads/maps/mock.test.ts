import { SuperfaceClient } from '@superfaceai/one-sdk';

const sampleLead = {
  jobId: 'JOB_ID',
  firstName: 'Demo',
  lastName: 'Testing',
  email: 'demo_testing@fakemail.com',
};

describe('recruitment/leads/mock', () => {
  describe('CreateLead', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('recruitment/leads');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('CreateLead');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(sampleLead, { provider });

      expect(result.isOk() && (result.value as any)).toEqual({
        id: 'LEAD_ID',
        jobId: 'JOB_ID',
      });
    });
  });
});
