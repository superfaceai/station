import { SuperfaceClient } from '../../../../superface/sdk';

describe('navigation/nearby-poi/google-apis-typed', () => {
  beforeAll(() => {
    jest.setTimeout(10000)
  })

  it('finds Astronomy Cafe in Greenwich', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('navigation/nearby-poi');
    const provider = await client.getProvider('google-apis');
    const usecase = profile.useCases.NearbyPoi;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform(
      {
        center: {
          latitude: 51.477,
          longitude: 0.0
        },
        radius: 100,
        categories: ['CAFE']
      },
      { provider }
    );
    
    const points = result.unwrap();

    expect(
      points.every(
        p => p.categories.includes('CAFE')
      )
    ).toBe(true)

    expect(
      points
    ).toContainEqual(
      {
        coordinates: {
          latitude: 51.47674399999999,
          longitude: -0.0005606
        },
        name: 'Astronomy Cafe',
        categories: ['CAFE']
      }
    )
  });

  it('filters categories correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('navigation/nearby-poi');
    const provider = await client.getProvider('google-apis');
    const usecase = profile.useCases.NearbyPoi;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform(
      {
        center: {
          latitude: 51.477,
          longitude: 0.0
        },
        radius: 1000,
        categories: ['CAFE', 'RESTAURANT']
      },
      { provider }
    );
    
    const points = result.unwrap();

    expect(
      points.every(
        p => p.categories.includes('CAFE') || p.categories.includes('RESTAURANT')
      )
    ).toBe(true)
  });

  it('returns empty results array instead of error', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('navigation/nearby-poi');
    const provider = await client.getProvider('google-apis');
    const usecase = profile.useCases.NearbyPoi;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform(
      {
        center: {
          latitude: 51.477,
          longitude: 0.0
        },
        radius: 1,
        categories: ['RESTAURANT']
      },
      { provider }
    );

    expect(
      () => result.unwrap()
    ).not.toThrow()
  });
});