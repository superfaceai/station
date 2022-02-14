import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('weather/forecast-city/mock-typed', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('weather/forecast-city');
    const provider = await client.getProvider('mock');
    const usecase = profile.getUseCase('GetWeatherForecastInCity');

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform({ city: 'Prague,CZ' }, { provider });

    expect(result.unwrap()).toEqual([
      {
        averageTemperature: -1,
        date: 'today',
      },
    ]);
  });
});
