/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const forecastCityTest = (
  provider: string,
  options?: RecordingProcessOptions
): void => {
  describe(`weather/forecast-city/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'weather/forecast-city',
        provider,
        useCase: 'GetWeatherForecastInCity',
        testInstance: expect,
      });
    });

    describe('GetWeatherForecastInCity', () => {
      describe('when all inputs are correct', () => {
        it('should return weather object', async () => {
          const input = {
            city: 'Prague,CZ',
          };

          await expect(
            superface.run(
              {
                input,
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });
      });

      describe('when inputs are invalid', () => {
        it('should throw an exception', async () => {
          const input = {
            city: '%',
          };

          await expect(
            superface.run(
              {
                input,
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
