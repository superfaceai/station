import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('chat/channels/mock', () => {
  describe('GetChannels', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('chat/channels');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('GetChannels');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform({}, { provider });

      expect(result.isOk() && (result.value as any).channels.length).toEqual(3);
    });
  });
});
