import { SuperfaceClient } from '@superfaceai/one-sdk';

const sampleLead = {
  firstName: 'Demo',
  lastName: 'Testing',
  email: 'demo_testing@fakemail.com',
};

describe('recruitment/leads/mock', () => {
  describe('CreateLead', () => {
    describe('when job possibly associated with lead is available', () => {
      it('performs correctly', async () => {
        const client = new SuperfaceClient();
        const profile = await client.getProfile('recruitment/leads');
        const provider = await client.getProvider('mock');
        const usecase = profile.getUseCase('CreateLead');

        expect(provider).not.toBeUndefined();
        expect(usecase).not.toBeUndefined();

        const result = await usecase.perform(
          {
            jobId: 'JOB_ID',
            ...sampleLead,
          },
          { provider }
        );

        expect(result.isOk() && (result.value as any)).toEqual({
          id: 'LEAD_ID',
          jobId: 'JOB_ID',
        });
      });
    });
  });

  describe('when job is not available', () => {
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
      });
    });
  });
});
