import { SuperfaceClient } from '../../../../superface/sdk';

describe('weather/current-city/mock-typed', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('weather/current-city');
    const provider = await client.getProvider('mock');
    const usecase = profile.useCases.GetCurrentWeatherInCity;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform({ city: 'Prague,CZ' }, { provider });
    expect(result.unwrap()).toEqual({
      temperature: -1,
      feelsLike: 1,
      description: 'Cloudy with a Chance of Meatballs',
    });
  });
});
