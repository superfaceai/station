import { SuperfaceClient } from '@superfaceai/one-sdk';

const sampleLead = {
  firstName: 'Demo',
  lastName: 'Testing',
  email: 'demo_testing@fakemail.com',
};

describe('recruitment/create-lead/mock', () => {
  describe('CreateLead', () => {
    describe('when job possibly associated with lead is available', () => {
      it('performs correctly', async () => {
        const client = new SuperfaceClient();
        const profile = await client.getProfile('recruitment/create-lead');
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
      const profile = await client.getProfile('recruitment/create-lead');
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

describe('CreateLeadFeatures', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('recruitment/create-lead');
    const provider = await client.getProvider('mock');
    const usecase = profile.getUseCase('CreateLeadFeatures');

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform({}, { provider });

    expect(result.isOk() && result.value).toEqual({
      cvMIMETypes: [
        'application/pdf',
        'text/rtf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.custom-properties+xml',
      ],
      cvUploadMethods: ['url', 'file'],
    });
  });
});
