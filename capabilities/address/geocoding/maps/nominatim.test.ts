import { SuperfaceClient } from '../../../../superface/sdk';

describe('address/geocoding/nominatim', () => {
  it('Geocode address', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('nominatim');
    const result1 = await profile.useCases.Geocode.perform(
      {
        streetAddress: '1600 Amphitheatre Parkway',
        addressLocality: 'Mountain View',
        addressRegion: 'CA',
        addressCountry: 'USA',
      },
      { provider }
    );

    expect(result1.isOk()).toBeTruthy();
    expect(result1.unwrap().latitude).toBe('37.42248575');
    expect(result1.unwrap().longitude).toBe('-122.08558456613565');

    const result2 = await profile.useCases.Geocode.perform(
      {
        query: '1600 Amphitheatre Parkway, Mountain View, CA'
      },
      { provider }
    );

    expect(result2.isOk()).toBeTruthy();
    expect(result2.unwrap().latitude).toBe('37.42248575');
    expect(result2.unwrap().longitude).toBe('-122.08558456613565');
  });

  it('Reverse geocode geographical coordingates', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('nominatim');
    const result = await profile.useCases.ReverseGeocode.perform(
      {
        latitude: 40.714224,
        longitude: -73.961452,
      },
      { provider }
    );

    const value = result.unwrap();
    expect(result.isOk()).toBeTruthy();
    expect(value).toEqual([
      {
        addressCountry: 'us',
        addressRegion: 'Kings County, New York',
        addressLocality: 'Brooklyn, New York',
        streetAddress: '281 Bedford Avenue',
        postalCode: '11211',
        formattedAddress:
          '281, Bedford Avenue, Williamsburg, Brooklyn, Kings County, New York, 11211, United States',
      },
    ]);
  });
});
