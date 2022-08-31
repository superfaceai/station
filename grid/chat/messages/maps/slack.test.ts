import { SuperfaceTest } from '@superfaceai/testing';

/**
 * Live tests
 *
 * @group live/safe
 */

const provider = 'slack';
const destination = 'C03UL8E5YMR';

describe('chat/messages/slack', () => {
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
        for (const i of [1, 2, 3, 4, 5]) {
          const result = await prepare.run({
            input: { destination, text: `Test ${i}` },
            testName: `prepare-chat/messages-chat/send-${i}`,
          });

          if (result.isOk()) {
            messageIds.push((result.value as any).messageId);
          }
        }
      });

      afterEach(async () => {
        for (const i of [0, 1, 2, 3, 4]) {
          await teardown.run(
            {
              input: { destination, messageId: messageIds[i] },
              testName: `teardown-chat/messages-chat/delete-${i + 1}`,
            },
            {
              hideInput: ['messageId'],
            }
          );
        }
      });

      it('performs correctly', async () => {
        const page1 = await superface.run({
          input: {
            destination,
            limit: 3,
          },
          testName: 'page 1',
        });

        expect(page1.isOk).toBeTruthy();

        /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */

        expect(page1).toMatchSnapshot({
          value: expect.objectContaining({
            messages: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                author: expect.objectContaining({
                  id: expect.any(String),
                }),
                createdAt: expect.any(Number),
              }),
            ]),
          }),
        });

        const cursor = page1.isOk() ? (page1.value as any).nextPage : undefined;

        if (!cursor) {
          return;
        }

        const page2 = await superface.run(
          {
            input: {
              destination,
              limit: 2,
              page: cursor,
            },
            testName: 'page 2',
          },
          { hideInput: ['page'] }
        );

        expect(page2.isOk).toBeTruthy();
        expect(page2).toMatchSnapshot({
          value: expect.objectContaining({
            messages: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                author: expect.objectContaining({
                  id: expect.any(String),
                }),
                createdAt: expect.any(Number),
              }),
            ]),
          }),
        });
      });
    });

    describe('when specified destination does not exist', () => {
      it('returns error', async () => {
        const result = await superface.run(
          {
            input: {
              destination: 'not-existing-dest',
            },
          },
          { fullError: true }
        );

        expect(result).toMatchSnapshot({
          error: expect.objectContaining({
            kind: expect.stringMatching('HTTPError'),
            message: expect.stringMatching('Expected HTTP error'),
            properties: expect.objectContaining({
              title: expect.any(String),
            }),
            statusCode: expect.any(Number),
          }),
        });
      });
    });
  });
});
