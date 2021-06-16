import { SuperfaceClient } from '../../../../superface/sdk';

describe('address/geocoding/azure-maps-typed', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('Geocode address', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('azure-maps');
    const usecase = profile.useCases.Geocode;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    //Edit input values and expected result
    const result = await usecase.perform(
      {
        query: 'Prague',
      },
      { provider }
    );

    expect(result.unwrap()).toEqual({
      lat: 50.08781,
      lon: 14.42046,
    });
  });

  it.skip('Reverse geocode geographical coordingates', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('azure-maps');
    const usecase = profile.useCases.ReverseGeocode;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();
    
    const result = await usecase.perform(
      {
        latitude: 50.0593325,
        longitude: 14.1854451,
      },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual([
      {
        addressCountry: 'US',
        streetAddress: '281 Bedford Avenue',
        postalCode: '11211',
        addressRegion: 'NY',
        addressLocality: 'New York',
        formattedAddress:
          '281 Bedford Avenue, New York, NY 11211, United States of America',
      },
    ]);
  });
});
