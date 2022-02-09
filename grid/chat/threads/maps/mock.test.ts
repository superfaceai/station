import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('chat/threads/mock', () => {
  describe('GetThreads', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('chat/threads');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('GetThreads');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        { server: 'server_id' },
        { provider }
      );

      expect(result.isOk() && (result.value as any).threads.length).toEqual(3);
    });
  });
});
