/* eslint-disable jest/no-export */
import { SuperfaceTest } from '@superfaceai/testing';

export const ipGeolocationTest = (provider: string): void => {
  describe(`address/ip-geolocation/${provider}`, () => {
    let superfaceTest: SuperfaceTest;

    beforeEach(() => {
      superfaceTest = new SuperfaceTest({
        profile: 'address/ip-geolocation',
        provider,
      });
    });

    describe('IpGeolocation', () => {
      describe('when api key is valid', () => {
        it('should return geolocation coordinates and address for valid IP address', async () => {
          await expect(
            superfaceTest.run({
              useCase: 'IpGeolocation',
              input: { ipAddress: '8.8.8.8' },
            })
          ).resolves.toMatchSnapshot();
        });

        it('should return client IP geolocation coordinates when no IP address specified in input', async () => {
          await expect(
            superfaceTest.run({
              useCase: 'IpGeolocation',
              input: {},
            })
          ).resolves.toMatchSnapshot();
        });

        it('should return bad request error when IP address format is wrong', async () => {
          await expect(
            superfaceTest.run({
              useCase: 'IpGeolocation',
              input: { ipAddress: '256.256.256.256' },
            })
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
