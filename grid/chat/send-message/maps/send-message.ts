/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const sendMessageTest = (
  provider: string,
  destination: {
    valid: string;
    invalid: string;
  },
  options?: RecordingProcessOptions
): void => {
  describe(`chat/send-message/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('SendMessage', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'chat/send-message',
          provider,
          useCase: 'SendMessage',
          testInstance: expect,
        });
      });

      describe('when specified destination does exist', () => {
        it('performs correctly', async () => {
          await expect(
            superface.run(
              {
                input: {
                  destination: destination.valid,
                  text: 'test',
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
                  destination: destination.invalid,
                  text: 'test',
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
