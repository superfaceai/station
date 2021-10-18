import { SuperfaceClient } from '../../../../superface/sdk';

describe('navigation/nearby-poi/mock-typed', () => {
  beforeAll(() => {
    jest.setTimeout(10000)
  })
  
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('navigation/nearby-poi');
    const provider = await client.getProvider('mock');
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