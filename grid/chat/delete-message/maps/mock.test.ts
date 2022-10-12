import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('chat/delete-message/mock', () => {
  describe('DeleteMessage', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('chat/delete-message');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('DeleteMessage');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        { messageId: 'ID', destination: 'random' },
        { provider }
      );

      expect(result.isOk()).toBeTruthy();
      expect(result).toEqual({ value: {} });
    });

    it('returns error', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('chat/delete-message');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('DeleteMessage');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        { messageId: 'ID', destination: 'not-existing-dest' },
        { provider }
      );

      expect(result.isErr()).toBeTruthy();
      expect(result).toEqual({
        error: expect.objectContaining({
          properties: expect.objectContaining({ title: 'Channel not found' }),
        }),
      });
    });
  });
});
