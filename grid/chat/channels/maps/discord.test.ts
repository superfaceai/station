import { SuperfaceTest } from '@superfaceai/testing';

describe('chat/channels/discord', () => {
  let superface: SuperfaceTest;

  describe('GetChannels', () => {
    beforeAll(() => {
      superface = new SuperfaceTest({
        profile: 'chat/channels',
        provider: 'discord',
        useCase: 'GetChannels',
        testInstance: expect,
      });
    });

    describe('when specified destination does exist', () => {
      it('performs correctly', async () => {
        const result = await superface.run({
          input: {
            workspace: '935962220104396881',
            visibility: 'public',
            limit: 4,
          },
        });

        expect(result).toMatchSnapshot({
          value: expect.objectContaining({
            channels: expect.arrayContaining([
              expect.objectContaining({
                createdAt: expect.any(Number),
                id: expect.any(String),
                name: expect.any(String),
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
              workspace: '000000000000000000',
              visibility: 'public',
              limit: 4,
            },
          },
          { fullError: true }
        );

        expect(result).toMatchSnapshot({
          error: expect.objectContaining({
            kind: expect.stringMatching('HTTPError'),
            message: expect.stringMatching('Expected HTTP error'),
            properties: expect.objectContaining({
              title: 'Not found',
              detail: 'Unknown Guild',
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
