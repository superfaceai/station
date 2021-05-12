import { SuperfaceClient } from '../../../../superface/sdk';

describe('address/geocoding/mock-typed', () => {
  it('Geocode address', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('mock');
    const result = await profile.useCases.Geocode.perform(
      {
        streetAddress: '',
        addressLocality: '',
        addressRegion: '',
        addressCountry: '',
      },
      { provider }
    );

    const value = result.unwrap();
    expect(result.isOk()).toBeTruthy();
    expect(value.latitude).toBeDefined();
    expect(value.longitude).toBeDefined();
  });

  it('Reverse geocode geographical coordingates', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('mock');
    const result = await profile.useCases.ReverseGeocode.perform(
      {
        latitude: 0,
        longitude: 0,
      },
      { provider }
    );

    const value = result.unwrap();
    expect(result.isOk()).toBeTruthy();
    expect(value[0]).toBeDefined();
  });
});
