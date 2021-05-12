import { SuperfaceClient } from '../../../../superface/sdk';

describe('weather/will-it-rain/openweathermap-typed', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('weather/will-it-rain');
    const provider = await client.getProvider('openweathermap');
    const usecase = profile.useCases.WillItRain;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    //Edit input values and expected result
    //const result = await usecase.perform({}, { provider });
    //expect(result.unwrap()).toEqual();
  });
});