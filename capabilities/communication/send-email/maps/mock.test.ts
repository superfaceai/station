import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('communication/send-email/mock', () => {
  describe('SendEmail', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('communication/send-email');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('SendEmail');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        {
          from: '',
          to: '',
          subject: '',
          text: '',
        },
        { provider }
      );

      expect(typeof (result.unwrap() as any).messageId).toEqual('string');
    });
  });
});
