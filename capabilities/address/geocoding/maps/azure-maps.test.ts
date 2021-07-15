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
      latitude: 50.08781,
      longitude: 14.42046,
    });
  });

  it('Reverse geocode geographical coordinates', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('azure-maps');
    const usecase = profile.useCases.ReverseGeocode;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();
    
    const result = await usecase.perform(
      {
        latitude: 40.714224,
        longitude: -73.961452,
      },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual([
      {
        addressCountry: 'US',
        addressRegion: 'Kings, NY',
        addressCityDistrict: "Kings",
        addressLocality: 'Brooklyn, New York',
        streetAddress: '279 Bedford Avenue',
        postalCode: '11211',
        formattedAddress:
          '279 Bedford Avenue, Brooklyn, NY 11211, United States',
      },
    ]);
  });
});
