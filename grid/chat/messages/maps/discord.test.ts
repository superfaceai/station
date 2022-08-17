import { SuperfaceTest } from '@superfaceai/testing';

/**
 * Live tests
 *
 * @group live/safe
 */

describe('chat/messages/discord', () => {
  let superface: SuperfaceTest;

  describe('GetMessages', () => {
    beforeAll(() => {
      superface = new SuperfaceTest({
        profile: 'chat/messages',
        provider: 'discord',
        useCase: 'GetMessages',
        testInstance: expect,
      });
    });

    describe('when specified destination does exist', () => {
      it('performs correctly', async () => {
        const page1 = await superface.run({
          input: {
            destination: '938614740995960844',
            limit: 3,
          },
          testName: 'page 1',
        });

        expect(page1.isOk).toBeTruthy();

        /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
        const cursor = page1.isOk() ? (page1.value as any).nextPage : undefined;

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
            nextPage: expect.any(String),
            rateLimit: expect.objectContaining({
              resetTimestamp: expect.any(Number),
            }),
          }),
        });

        if (!cursor) {
          return;
        }

        const page2 = await superface.run({
          input: {
            destination: '938614740995960844',
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
            rateLimit: expect.objectContaining({
              resetTimestamp: expect.any(Number),
            }),
          }),
        });
      });
    });

    describe('when specified destination does not exist', () => {
      it('returns error', async () => {
        const res = await superface.run(
          {
            input: {
              destination: '000000000000000000',
            },
          },
          { fullError: true }
        );

        expect(res).toMatchSnapshot({
          error: expect.objectContaining({
            kind: expect.stringMatching('HTTPError'),
            message: expect.stringMatching('Expected HTTP error'),
            properties: expect.objectContaining({
              title: expect.any(String),
              rateLimit: expect.objectContaining({
                resetTimestamp: expect.any(Number),
              }),
            }),
            statusCode: expect.any(Number),
          }),
        });
      });
    });
  });
});
