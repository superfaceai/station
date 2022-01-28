/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getMessagesTest = (
  provider: string,
  destination: string[],
  options?: RecordingProcessOptions
): void => {
  describe(`chat/get-messages/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetMessages', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'chat/get-messages',
          provider,
          useCase: 'GetMessages',
        });
      });

      describe('when specified destination does exist', () => {
        it('performs correctly', async () => {
          await expect(
            superface.run(
              {
                input: {
                  destination: destination[0],
                },
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });
      });

      describe('when specified destination does not exist', () => {
        it('returns error', async () => {
          await expect(
            superface.run(
              {
                input: {
                  destination: destination[1],
                },
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
