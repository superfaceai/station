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

          expect(page1.isOk).toBeTruthy()
          expect(page1).toMatchSnapshot();

          const page2 = await superface.run(
            {
              input: {
                destination: destination[0],
                limit: 3,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                page: page1.isOk() ? (page1.value as any).nextPage : undefined
              },
            },
            options
          );

          expect(page2.isOk).toBeTruthy()
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
