import { SuperfaceClient } from '../../../../superface/sdk';

describe('address/clean-address/mock', () => {
  describe('CleanAddress', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('address/clean-address');
      const provider = await client.getProvider('mock');
      const usecase = profile.useCases.CleanAddress;

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        {
          street: '270 7th Street',
          city: 'San Francisco',
          state: 'US',
        },
        { provider }
      );

      expect(result.unwrap().street).toEqual('270 7th Street');
    });
  });
});
