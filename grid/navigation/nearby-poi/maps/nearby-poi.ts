/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';
import { nockConfig } from '../../../test-config';

export const nearbyPoiTest = (provider: string): void => {
  describe(`navigation/nearby-poi/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest(
        {
          profile: 'navigation/nearby-poi',
          provider,
        },
        nockConfig
      );
    });

    describe('find nearby pois', () => {
      it('should find astronomy cafe', async () => {
        const input = {
          center: {
            latitude: 51.477,
            longitude: 0.0,
          },
          radius: 100,
          categories: ['CAFE'],
        };

        await expect(
          superface.run({
            useCase: 'NearbyPoi',
            input,
          })
        ).resolves.toMatchSnapshot();
      });

      it('should find close pois with any category', async () => {
        const input = {
          center: {
            latitude: 51.477,
            longitude: 0.0,
          },
          radius: 10,
          //categories is missing
        };

        await expect(
          superface.run({
            useCase: 'NearbyPoi',
            input,
          })
        ).resolves.toMatchSnapshot();
      });

      it('should map error correctly', async () => {
        const input = {
          center: {
            latitude: 589.477,
            longitude: 998.0,
          },
          radius: 10,
        };

        await expect(
          superface.run({
            useCase: 'NearbyPoi',
            input,
          })
        ).resolves.toMatchSnapshot();
      });
    });
  });
};
