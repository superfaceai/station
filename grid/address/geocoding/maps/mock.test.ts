import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('address/geocoding/mock-typed', () => {
  it('Geocode address', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('mock');
    const result = await profile.getUseCase('Geocode').perform(
      {
        streetAddress: '',
        addressLocality: '',
        addressRegion: '',
        addressCountry: '',
      },
      { provider }
    );

    const value = result.unwrap() as any;
    expect(result.isOk()).toBeTruthy();
    expect(value.latitude).toBeDefined();
    expect(value.longitude).toBeDefined();
  });

  it('Reverse geocode geographical coordingates', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('mock');
    const result = await profile.getUseCase('ReverseGeocode').perform(
      {
        latitude: 0,
        longitude: 0,
      },
      { provider }
    );

    const value = result.unwrap() as any;
    expect(result.isOk()).toBeTruthy();
    expect(value[0]).toBeDefined();
  });
});
