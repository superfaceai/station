import { SuperfaceClient } from '../../../../superface/sdk';

describe('weather/get-weather/mock-typed', () => {
  beforeAll(() => {
    jest.setTimeout(10000)
  })
  
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('weather/get-weather');
    const provider = await client.getProvider('mock');
    const usecase = profile.useCases.GetWeather;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform({city: 'Prague,CZ'}, { provider });
    expect(result.unwrap()).toEqual({
      temperature: -1,
      feels_like: 1,
      description: 'Cloudy with a Chance of Meatballs'
    });
  });
});
