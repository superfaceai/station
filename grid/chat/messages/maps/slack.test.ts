import { SuperfaceTest } from '@superfaceai/testing';

describe(`chat/messages/slack`, () => {
  let superface: SuperfaceTest;

  describe('GetMessages', () => {
    beforeAll(() => {
      superface = new SuperfaceTest({
        profile: 'chat/messages',
        provider: 'slack',
        useCase: 'GetMessages',
        testInstance: expect,
      });
    });

    describe('when specified destination does exist', () => {
      it('performs correctly', async () => {
        const page1 = await superface.run({
          input: {
            destination: 'CF3H7S63W',
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

        const page2 = await superface.run({
          input: {
            destination: 'CF3H7S63W',
            limit: 3,
            page: cursor,
          },
          testName: 'page 2',
        });

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
