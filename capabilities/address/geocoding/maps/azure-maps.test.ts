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
      lat: 50.08781,
      lon: 14.42046,
    });
  });

  // it('Reverse geocode geographical coordingates', async () => {});
});
