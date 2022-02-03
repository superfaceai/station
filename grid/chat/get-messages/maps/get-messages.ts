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
          const page1 = await superface.run(
            {
              input: {
                destination: destination[0],
                limit: 3,
              },
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

          const input = {
            destination: destination[0],
            limit: 3,
          } as any;

          if (provider === 'discord') {
            input.beforeDate = cursor;
          } else {
            input.page = cursor;
          }

          /* eslint-enable @typescript-eslint/no-unsafe-member-access */

          const page2 = await superface.run({ input }, options);

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