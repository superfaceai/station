import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('chat/workspaces/mock', () => {
  describe('GetWorkspaces', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('chat/workspaces');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('GetWorkspaces');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform({}, { provider });

      expect(result.isOk() && (result.value as any).workspaces.length).toEqual(
        2
      );
    });
  });
});
