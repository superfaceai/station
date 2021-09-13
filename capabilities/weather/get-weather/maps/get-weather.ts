/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jest/no-try-expect */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-export */

import {Provider} from '@superfaceai/one-sdk';

import {SuperfaceClient, WeatherGetWeatherProfile} from '../../../../superface/sdk';
import {describe, expect} from "@jest/globals";

export const getWeatherTest = (providerName: string): void => {
  describe(`weather/get-weather/${providerName}`, () => {
    let client: InstanceType<typeof SuperfaceClient>;
    let profile: WeatherGetWeatherProfile;
    let provider: Provider;

    beforeEach(async () => {
      client = new SuperfaceClient();
      profile = await client.getProfile('weather/get-weather');
      provider = await client.getProvider(providerName);
    });

    it('should find provider', async () => {
      expect(provider).not.toBeUndefined();
    });

    describe('GetWeather', () => {
      describe('when all inputs are correct', () => {
        it('should return weather object', async () => {
          const result = await profile.useCases.GetWeather.perform(
            {city: 'Prague,CZ'},
            {provider}
          );

          expect(typeof result.unwrap().temperature).toBe('number');
          expect(typeof result.unwrap().feels_like).toBe('number');
          expect(typeof result.unwrap().description).toBe('string');
        });
      });
    });
  });
}
