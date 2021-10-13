/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jest/no-try-expect */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-export */

import {describe, expect} from "@jest/globals";
import {Provider} from '@superfaceai/one-sdk';

import {SuperfaceClient, WeatherForecastCityProfile, } from '../../../../superface/sdk';

export const forecastCityTest = (providerName: string): void => {
  describe(`weather/forecast-city/${providerName}`, () => {
    let client: InstanceType<typeof SuperfaceClient>;
    let profile: WeatherForecastCityProfile;
    let provider: Provider;

    beforeEach(async () => {
      client = new SuperfaceClient();
      profile = await client.getProfile('weather/forecast-city');
      provider = await client.getProvider(providerName);
    });

    it('should find provider', async () => {
      expect(provider).not.toBeUndefined();
    });

    describe('GetWeatherForecastInCity', () => {
      describe('when all inputs are correct', () => {
        it('should return weather object', async () => {
          const result = await profile.useCases.GetWeatherForecastInCity.perform(
            {city: 'Prague,CZ'},
            {provider}
          );
          expect(Array.isArray(result.unwrap())).toEqual(true)
          expect(result.unwrap()[0]).toEqual({
            averageTemperature: expect.any(Number),
            date: expect.any(String),
            maxTemperature: expect.any(Number),
            minTemperature: expect.any(Number)
          })
        });
      });
    });
  });
}
