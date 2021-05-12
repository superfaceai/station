import { SuperfaceClient } from '../../../../superface/sdk';

describe('address/geocoding/opencage-typed', () => {
  it('Geocode address', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('opencage');
    const result = await profile.useCases.Geocode.perform(
      {
        streetAddress: '1600 Amphitheatre Parkway',
        addressLocality: 'Mountain View',
        addressRegion: 'CA',
        addressCountry: 'USA',
      },
      { provider }
    );

    const value = result.unwrap();
    expect(result.isOk()).toBeTruthy();
    expect(value.latitude).toBe(37.4224857);
    expect(value.longitude).toBe(-122.0855846);
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
