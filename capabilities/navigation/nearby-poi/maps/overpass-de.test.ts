import { SuperfaceClient } from '../../../../superface/sdk';

describe('navigation/nearby-poi/overpass-de-typed', () => {
  beforeAll(() => {
    jest.setTimeout(15000)
  })
  
  it('finds Astronomy Cafe in Greenwich', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('navigation/nearby-poi');
    const provider = await client.getProvider('overpass-de');
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
          latitude: 51.4768380,
          longitude: -0.0006877
        },
        name: 'Astronomy Café',
        categories: ['CAFE']
      }
    )
  });
});