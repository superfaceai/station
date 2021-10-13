import { SuperfaceClient } from '../../../../superface/sdk';

describe('weather/forecast-city/mock-typed', () => {
  beforeAll(() => {
    jest.setTimeout(10000)
  })
  
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('weather/forecast-city');
    const provider = await client.getProvider('mock');
    const usecase = profile.useCases.GetWeatherForecastInCity;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform(
      {city: 'Prague,CZ'},
      {provider}
    );

    expect(result.unwrap()).toEqual([
      {
        avgTemperature: -1,
        date: 'today'
      }
    ]);
  });
});