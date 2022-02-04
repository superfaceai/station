/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const sendMessageTest = (
  provider: string,
  destination: string[],
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
        });
      });

      describe('when specified destination does exist', () => {
        it('performs correctly', async () => {
          await expect(
            superface.run(
              {
                input: {
                  destination: destination[0],
                  text: 'test',
                  // TODO: implement sending attachments
                  attachments: [
                    {
                      id: '1',
                      createdAt: 1503435956.000247,
                      fileName: 'myfile.suma',
                      mediaType: 'text',
                      preview: 'sdasdasd',
                    },
                  ],
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
