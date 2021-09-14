/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jest/no-try-expect */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-export */

import {describe, expect} from "@jest/globals";
import {Provider} from '@superfaceai/one-sdk';

import {SuperfaceClient, WeatherCurrentCityProfile} from '../../../../superface/sdk';

export const currentCityTest = (providerName: string): void => {
  describe(`weather/current-city/${providerName}`, () => {
    let client: InstanceType<typeof SuperfaceClient>;
    let profile: WeatherCurrentCityProfile;
    let provider: Provider;

    beforeEach(async () => {
      client = new SuperfaceClient();
      profile = await client.getProfile('weather/current-city');
      provider = await client.getProvider(providerName);
    });

    it('should find provider', async () => {
      expect(provider).not.toBeUndefined();
    });

    describe('GetCurrentWeatherInCity', () => {
      describe('when all inputs are correct', () => {
        it('should return weather object', async () => {
          const result = await profile.useCases.GetCurrentWeatherInCity.perform(
            {city: 'Prague,CZ'},
            {provider}
          );

          expect(typeof result.unwrap().temperature).toBe('number');
          expect(typeof result.unwrap().feelsLike).toBe('number');
          expect(typeof result.unwrap().description).toBe('string');
        });
      });
    });
  });
}
