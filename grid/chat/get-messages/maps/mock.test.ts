import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('chat/get-messages/mock', () => {
  describe('GetMessages', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('chat/get-messages');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('GetMessages');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        { destination: 'random' },
        { provider }
      );

      expect(result.isOk() && (result.value as any).messages.length).toEqual(3);
    });
  });
});
