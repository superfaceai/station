/* eslint-disable jest/no-export */

import {
  RecordingProcessOptions,
  SuperfaceTest,
} from '@superfaceai/testing-lib';

export const geocodingTest = (
  provider: string,
  hooks?: RecordingProcessOptions
): void => {
  describe(`address/geocoding/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest();
    });

    describe('Geocode', () => {
      describe('when all inputs are correct', () => {
        it('should geocode address to geographical coordinates', async () => {
          await expect(
            superface.run(
              {
                profile: 'address/geocoding',
                provider,
                useCase: 'Geocode',
                input: {
                  query: 'Prague',
                },
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });

      describe('when inputs are invalid', () => {
        it('should throw an exception', async () => {
          await expect(
            superface.run(
              {
                profile: 'address/geocoding',
                provider,
                useCase: 'Geocode',
                input: {},
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });

    describe('ReverseGeocode', () => {
      describe('when all inputs are correct', () => {
        it('should reverse geocode geographical coordinates', async () => {
          const input = {
            latitude: 40.714224,
            longitude: -73.961452,
          };

          await expect(
            superface.run(
              {
                profile: 'address/geocoding',
                provider,
                useCase: 'ReverseGeocode',
                input,
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });

      describe('when inputs are invalid', () => {
        it('should throw an exception', async () => {
          const input = {};
          await expect(
            superface.run(
              {
                profile: 'address/geocoding',
                provider,
                useCase: 'ReverseGeocode',
                input,
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
