/* eslint-disable jest/no-export */
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const ipGeolocationTest = (
  provider: string,
  recordingOptions?: RecordingProcessOptions
): void => {
  describe(`address/ip-geolocation/${provider}`, () => {
    let superfaceTest: SuperfaceTest;

    beforeEach(() => {
      superfaceTest = buildSuperfaceTest({
        profile: 'address/ip-geolocation',
        provider,
      });
    });

    describe('IpGeolocation', () => {
      describe('when api key is valid', () => {
        it('should return geolocation coordinates and address for valid IP address', async () => {
          const result = await superfaceTest.run(
            {
              useCase: 'IpGeolocation',
              input: { ipAddress: '8.8.8.8' },
            },
            recordingOptions
          );
          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });

        it('should return client IP geolocation coordinates when no IP address specified in input', async () => {
          const result = await superfaceTest.run(
            {
              useCase: 'IpGeolocation',
              input: {},
            },
            recordingOptions
          );
          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });

        it('should return bad request error when IP address format is wrong', async () => {
          const result = await superfaceTest.run(
            {
              useCase: 'IpGeolocation',
              input: { ipAddress: '256.256.256.256' },
            },
            recordingOptions
          );
          expect(() => result.unwrap()).toThrow();
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
