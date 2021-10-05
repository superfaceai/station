import { SuperfaceClient } from '../../../../superface/sdk';

describe('communication/send-templated-email/mock', () => {
  describe('SendTemplatedEmail', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile(
        'communication/send-templated-email'
      );
      const provider = await client.getProvider('mock');
      const usecase = profile.useCases.SendTemplatedEmail;

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        {
          from: '',
          to: '',
          templateId: '',
          templateData: {},
        },
        { provider }
      );

      expect(typeof result.unwrap().messageId).toEqual('string');
    });
  });
});
