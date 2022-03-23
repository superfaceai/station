/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getMessagesTest = (
  provider: string,
  destination: {
    channel: string,
    thread: string,
  }[],
  options?: RecordingProcessOptions
): void => {
  describe(`chat/messages/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetMessages', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'chat/messages',
          provider,
          useCase: 'GetMessages',
          testInstance: expect,
        });
      });

      describe('when specified destination does exist', () => {
        it('performs correctly', async () => {
          const page1 = await superface.run(
            {
              input: {
                destination: destination[0].channel,
                limit: 3,
              },
              testName: 'get messages - page 1',
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
                destination: destination[0].channel,
                limit: 3,
                page: cursor,
              },
              testName: 'get messages - page 2',
            },
            options
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
                  destination: destination[1].channel,
                },
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });
      });

      describe('when specified thread destination exists', () => {
        it('performs correctly', async () => {
          const page1 = await superface.run(
            {
              input: {
                destination: destination[0].channel,
                threadId: destination[0].thread,
                listThreadMessages: true,
                limit: 3,
              },
              testName: 'get thread messages - page 1',
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
                destination: destination[0].channel,
                threadId: destination[0].thread,
                listThreadMessages: true,
                limit: 3,
                page: cursor,
              },
              testName: 'get thread messages - page 2',
            },
            options
          );

          expect(page2.isOk).toBeTruthy();
          expect(page2).toMatchSnapshot();
        });
      });

      describe('when specified thread destination does not exist', () => {
        it('returns error', async () => {
          await expect(
            superface.run(
              {
                input: {
                  destination: destination[0].channel,
                  threadId: destination[1].thread,
                  listThreadMessages: true,
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
