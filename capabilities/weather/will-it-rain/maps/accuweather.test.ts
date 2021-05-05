import { SuperfaceClient } from '../../../../superface/sdk';
import { weatherWillItRain } from '../../../../superface/types/weather';

describe('weather/will-it-rain/accuweather-typed', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('weather/will-it-rain');
    const provider = await client.getProvider('accuweather');
    const usecase = profile.useCases.WillItRain;
    const result = await usecase.perform(
      {
        city: "Prague",
        date: "TODO",
        units: "Metric"
      },
      { provider }
    );

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    //Edit input values and expected result
    //const result = await usecase.perform({}, { provider });
    //expect(result.unwrap()).toEqual();
  });
});