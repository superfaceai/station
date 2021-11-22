import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('crypto/exchange-rate/mock', () => {
  describe('GetExchangeRate', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('crypto/exchange-rate');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('GetExchangeRate');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        {
          from: 'ETH',
          to: 'BTC',
        },
        { provider }
      );
      expect(result.unwrap()).toEqual({
        rate: '0.06249100',
      });
    });
  });
});
