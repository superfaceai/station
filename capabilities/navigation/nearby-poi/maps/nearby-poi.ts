/* eslint-disable jest/no-export */

import { RecordingProcessFunctions, SuperfaceTest } from '@superfaceai/testing-lib';

export const nearbyPoiTest = (
  provider: string,
  options?: {
    supertestHooks?: RecordingProcessFunctions
  }
): void => {
  describe(`navigation/nearby-poi/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest();
    });

    describe('find nearby pois', () => {
      it('it should find astronomy cafe', async () => {
        const input = {
          center: {
            latitude: 51.477,
            longitude: 0.0
          },
          radius: 100,
          categories: ['CAFE']
        };

        await expect(
          superface.run({
            profile: 'navigation/nearby-poi',
            provider,
            useCase: 'NearbyPoi',
            input,
          }, options?.supertestHooks)
        ).resolves.toMatchSnapshot();
      });
    });
  });
};