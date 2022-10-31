/* eslint-disable jest/no-export */
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

export const ipGeolocationTest = (
  provider: string,
  recordingOptions?: RecordingProcessOptions
): void => {
  describe(`address/ip-geolocation/${provider}`, () => {
    let superfaceTest: SuperfaceTest;

    beforeEach(() => {
      superfaceTest = new SuperfaceTest(
        {
          profile: 'address/ip-geolocation',
          provider,
        },
        nockConfig
      );
    });

    describe('IpGeolocation', () => {
      describe('when api key is valid', () => {
        it('should return geolocation coordinates and address for valid IP address', async () => {
          await expect(
            superfaceTest.run(
              {
                useCase: 'IpGeolocation',
                input: { ipAddress: '8.8.8.8' },
              },
              recordingOptions
            )
          ).resolves.toMatchSnapshot();
        });

        it('should return client IP geolocation coordinates when no IP address specified in input', async () => {
          await expect(
            superfaceTest.run(
              {
                useCase: 'IpGeolocation',
                input: {},
              },
              recordingOptions
            )
          ).resolves.toMatchSnapshot();
        });

        it('should return bad request error when IP address format is wrong', async () => {
          await expect(
            superfaceTest.run(
              {
                useCase: 'IpGeolocation',
                input: { ipAddress: '256.256.256.256' },
              },
              recordingOptions
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
