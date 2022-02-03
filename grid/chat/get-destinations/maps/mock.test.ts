import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('chat/get-destinations/mock', () => {
  describe('GetDestinations', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('chat/get-destinations');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('GetDestinations');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform({}, { provider });

      expect(result.isOk() && (result.value as any).messages.length).toEqual(3);
    });
  });
});
