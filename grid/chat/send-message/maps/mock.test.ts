import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('chat/send-message/mock', () => {
  describe('SendMessage', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('chat/send-message');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('SendMessage');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        { destination: 'random', text: 'test' },
        { provider }
      );

      expect(result.isOk() && (result.value as any).messageId).toEqual('1');
    });
  });
});
