import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('chat/members/mock', () => {
  describe('GetMembers', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('chat/members');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('GetMembers');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform({}, { provider });

      expect(result.isOk() && (result.value as any).members.length).toEqual(2);
    });
  });
});
