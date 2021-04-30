
import { SuperfaceClient } from '../../../../superface/sdk';

describe('address/geocoding/google-apis', () => {
  it('Geocode address', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const provider = await client.getProvider('google-apis');
    const result = await profile.useCases.Gecode.perform({
      streetAddress: "1600 Amphitheatre Parkway",
      addressLocality: "Mountain View",
      addressRegion: "CA",
      addressCountry: "USA"
    }, { provider })

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap().latitude).toBe(37.4305);
    expect(result.unwrap().longitude).toBe(-122.0769661);
  })
})
