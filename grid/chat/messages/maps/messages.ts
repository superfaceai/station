/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getMessagesTest = (
  provider: string,
  destination: string[],
  options?: RecordingProcessOptions
): void => {
  describe(`chat/messages/${provider}`, () => {
    let superface: SuperfaceTest;
    let prepare: SuperfaceTest;
    let teardown: SuperfaceTest;
    const messageIds: string[] = [];

    describe('GetMessages', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'chat/messages',
          provider,
          useCase: 'GetMessages',
          testInstance: expect,
        });

        prepare = new SuperfaceTest({
          profile: 'chat/send-message',
          provider,
          useCase: 'SendMessage',
        });

        teardown = new SuperfaceTest({
          profile: 'chat/delete-message',
          provider,
          useCase: 'DeleteMessage',
        });
      });

      describe('when specified destination does exist', () => {
        beforeEach(async () => {
          for (const i of [1, 2, 3, 4]) {
            const result = await prepare.run({
              input: { destination: destination[0], text: `Test ${i}` },
              testName: `prepare-chat/messages-chat/send-${i}`,
            });

            if (result.isOk()) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              messageIds.push((result.value as any).messageId);
            }
          }
        });

        afterEach(async () => {
          for (const i of [0, 1, 2, 3]) {
            await teardown.run(
              {
                input: {
                  destination: destination[0],
                  messageId: messageIds[i],
                },
                testName: `teardown-chat/messages-chat/delete-${i + 1}`,
              },
              {
                hideInput: ['messageId'],
              }
            );
          }
        });

        it('performs correctly', async () => {
          const page1 = await superface.run(
            {
              input: {
                destination: destination[0],
                limit: 2,
              },
              testName: 'page 1',
            },
            options
          );

          expect(page1.isOk).toBeTruthy();
          expect(page1).toMatchSnapshot();

          /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
          const cursor = page1.isOk()
            ? (page1.value as any).nextPage
            : undefined;

          if (!cursor) {
            return;
          }

          const page2 = await superface.run(
            {
              input: {
                destination: destination[0],
                limit: 2,
                page: cursor,
              },
              testName: 'page 2',
            },
            { ...options, hideInput: ['page'] }
          );

          expect(page2.isOk).toBeTruthy();
          expect(page2).toMatchSnapshot();
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
