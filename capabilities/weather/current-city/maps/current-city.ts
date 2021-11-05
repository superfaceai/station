/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing-lib';

export const currentCityTest = (providerName: string): void => {
  describe(`weather/current-city/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest();
    });

    describe('GetCurrentWeatherInCity', () => {
      describe('when all inputs are correct', () => {
        it('returns a weather data', async () => {
          const result = await superface.run({
            profile: 'weather/current-city',
            provider: providerName,
            useCase: 'GetCurrentWeatherInCity',
            input: { city: 'Prague,CZ' },
          });
          const weatherData = result.unwrap();

          expect(weatherData).toEqual({
            temperature: expect.any(Number),
            feelsLike: expect.any(Number),
            description: expect.any(String),
          });
        });
      });
    });
  });
};
