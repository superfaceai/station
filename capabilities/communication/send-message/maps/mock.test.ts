import { SuperfaceClient } from '../../../../superface/sdk';

describe('communication/send-message', () => {
  describe('SendMessage', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('communication/send-message');
      const provider = await client.getProvider('mock');
      const usecase = profile.useCases.SendMessage;

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        {
          destination: 'my-channel',
          text: 'Hello from Station',
        },
        { provider }
      );

      expect(result.unwrap()).toEqual({
        destination: 'C1MOCKED',
        messageId: '1503435956.000247',
      });
    });
  });
});
