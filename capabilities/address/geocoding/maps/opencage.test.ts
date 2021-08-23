import { SuperfaceClient } from '../../../../superface/sdk';

describe('address/geocoding/opencage-typed', () => {
  it('Geocode address', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('opencage');
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
    expect(result1.unwrap().latitude).toBe(37.4224857);
    expect(result1.unwrap().longitude).toBe(-122.0855846);

    const result2 = await profile.useCases.Geocode.perform(
      {
        query: '1600 Amphitheatre Parkway Mountain View CA',
      },
      { provider }
    );

    expect(result2.isOk()).toBeTruthy();
    expect(result2.unwrap().latitude).toBe(37.4224857);
    expect(result2.unwrap().longitude).toBe(-122.0855846);
  });

  it('Reverse geocode geographical coordingates', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('opencage');
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
        addressCountry: 'USA',
        streetAddress: '281 Bedford Avenue',
        postalCode: '11211',
        addressRegion: 'Kings County, NY',
        addressLocality: 'Brooklyn, New York',
        formattedAddress:
          '281 Bedford Avenue, New York, NY 11211, United States of America',
      },
    ]);
  });
});
