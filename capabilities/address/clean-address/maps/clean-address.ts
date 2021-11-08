/* eslint-disable jest/no-export */

import {
  RecordingProcessOptions,
  SuperfaceTest,
} from '@superfaceai/testing-lib';

export const cleanAddressTest = (
  provider: string,
  hooks?: RecordingProcessOptions
): void => {
  describe(`address/clean-address/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest();
    });

    describe('CleanAddress', () => {
      describe('when all inputs are correct', () => {
        it('should return clean address', async () => {
          await expect(
            superface.run(
              {
                profile: 'address/clean-address',
                provider,
                useCase: 'CleanAddress',
                input: {
                  street: '3301 South Greenfield Road',
                  city: 'Gilbert',
                  state: 'AZ',
                  zipcode: '85297',
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
                profile: 'address/clean-address',
                provider,
                useCase: 'CleanAddress',
                input: {},
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
