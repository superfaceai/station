/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const currentCityTest = (providerName: string): void => {
  describe(`weather/current-city/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'weather/current-city',
        provider: providerName,
      });
    });

    describe('GetCurrentWeatherInCity', () => {
      describe('when all inputs are correct', () => {
        it('returns a weather data', async () => {
          const result = await superface.run({
            useCase: 'GetCurrentWeatherInCity',
            input: { city: 'Prague,CZ' },
          });
          const weatherData = result.unwrap();

          expect(weatherData).toMatchSnapshot();
        });
      });
    });
  });
};
