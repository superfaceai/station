/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getMessagesTest = (
  provider: string,
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

      it('performs correctly', async () => {
        await expect(
          superface.run(
            {
              input: {
                destination: 'random',
              },
            },
            options
          )
        ).resolves.toMatchSnapshot();
      });
    });
  });
};
