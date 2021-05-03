import { SuperfaceClient } from '../../../../superface/sdk';

describe('address/geocoding/opencage-typed', () => {

  // it('Geocode address', async () => {
  //   const client = new SuperfaceClient();
  //   const profile = await client.getProfile('address/geocoding');
  //   const provider = await client.getProvider('opencage');
  //   const result = await profile.useCases.Gecode.perform({
  //     streetAddress: "1600 Amphitheatre Parkway",
  //     addressLocality: "Mountain View",
  //     addressRegion: "CA",
  //     addressCountry: "USA"
  //   }, { provider })

  //   expect(result.isOk()).toBeTruthy();
  //   expect(result.unwrap().latitude).toBe(37.4305);
  //   expect(result.unwrap().longitude).toBe(-122.0769661);
  // })

  it('Reverse geocode geographical coordingates', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('opencage');
    const result = await profile.useCases.ReverseGeocode.perform({
      latitude: 40.714224,
      longitude: -73.961452
    }, { provider })

    const value = result.unwrap()

    expect(result.isOk()).toBeTruthy();
    expect(value.addresses).toBeDefined();
    expect(value.addresses?.length).toBeGreaterThan(0);
  })
})
