/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getMessagesTest = (
  provider: string,
  destination: string[],
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
                destination: destination[0],
                limit: 3,
              },
              testName: 'page 1',
            },
            options
          );

          expect(page1.isOk).toBeTruthy();
          expect(page1).toMatchSnapshot();

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (page1.isOk() && !(page1.value as any).nextPage) {
            throw new Error('Test results should be paginated');
          }

          const page2 = await superface.run(
            {
              input: {
                destination: destination[0],
                limit: 3,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                page: page1.isOk() ? (page1.value as any).nextPage : undefined,
              },
              testName: 'page 2',
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
