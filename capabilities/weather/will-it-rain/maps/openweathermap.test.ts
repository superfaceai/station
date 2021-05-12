import { SuperfaceClient } from '../../../../superface/sdk';

describe('weather/will-it-rain/openweathermap-typed', () => {
  it('should define provider and usecase', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('weather/will-it-rain');
    const provider = await client.getProvider('openweathermap');
    const usecase = profile.useCases.WillItRain;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('weather/will-it-rain');
    const provider = await client.getProvider('openweathermap');
    const usecase = profile.useCases.Now;
    const result = await usecase.perform(
      {
        coordinates: {
          latitude: 50.0948541,
          longitude: 14.4481567,
        },
        units: 'metric',
      },
      { provider }
    );

    console.debug(result);
    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap().precipitation).toBeDefined();
  });
});
