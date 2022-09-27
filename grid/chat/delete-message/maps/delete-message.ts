/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const deleteMessageTest = (
  provider: string,
  destination: string[],
  invalidMessageId: string,
  options?: RecordingProcessOptions
): void => {
  describe(`chat/delete-message/${provider}`, () => {
    let superface: SuperfaceTest;
    let prepare: SuperfaceTest;

    describe('DeleteMessage', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'chat/delete-message',
          provider,
          useCase: 'DeleteMessage',
          testInstance: expect,
        });

        prepare = new SuperfaceTest({
          profile: 'chat/send-message',
          useCase: 'SendMessage',
          provider,
        });
      });

      describe('when specified destination does exist', () => {
        let messageId: string;

        beforeEach(async () => {
          const result = await prepare.run({
            input: {
              destination: destination[0],
              text: 'test DeleteMessage',
            },
            testName: 'prepare-chat/delete-chat/send',
          });

          if (result.isOk()) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            messageId = (result.value as any).messageId;
          }
        });

        it('performs correctly', async () => {
          const result = await superface.run(
            {
              profile: 'chat/delete-message',
              useCase: 'DeleteMessage',
              input: {
                destination: destination[0],
                messageId,
              },
            },
            { ...options, hideInput: ['messageId'] }
          );

          expect(result.isOk).toBeTruthy();
          expect(result).toMatchSnapshot();
        });
      });

      describe('when specified destination does not exist', () => {
        it('returns error', async () => {
          const result = await superface.run(
            {
              input: {
                destination: destination[1],
                messageId: invalidMessageId,
              },
            },
            options
          );

          expect(result).toMatchSnapshot();
        });
      });

      describe('when specified message id does not exist', () => {
        it('returns error', async () => {
          const result = await superface.run(
            {
              input: {
                destination: destination[0],
                messageId: invalidMessageId,
              },
            },
            options
          );

          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
