import { SuperfaceClient } from '../../../../superface/sdk';

describe('address/geocoding/nominatim', () => {
  it('Geocode address', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('nominatim');
    const result = await profile.useCases.Geocode.perform(
      {
        streetAddress: '1600 Amphitheatre Parkway',
        addressLocality: 'Mountain View',
        addressRegion: 'CA',
        addressCountry: 'USA',
      },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap().latitude).toBe("37.42248575");
    expect(result.unwrap().longitude).toBe("-122.08558456613565");
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
        addressCountry: 'United States',
        addressRegion: 'New York',
        addressCityDistrict: 'Kings County',
        addressLocality: 'New York Brooklyn',
        streetAddress: '281 Bedford Avenue',
        postalCode: '11211',
        formattedAddress:
          '281, Bedford Avenue, Williamsburg, Brooklyn, Kings County, New York, 11211, United States',
      },
    ]);
  });
});
