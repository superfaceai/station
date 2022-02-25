import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('address/ip-geolocation/mock', () => {
  describe('IpGeolocation', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('address/ip-geolocation');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('IpGeolocation');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        {
          ipAddress: '8.8.8.8',
        },
        { provider }
      );

      expect(result.unwrap() as any).toEqual({
        addressCountry: 'United States',
        addressCountryCode: 'US',
        ipAddress: '8.8.8.8',
        latitude: 37.751,
        longitude: -97.822,
        timeZone: 'America/Chicago',
      });
    });
  });
});
