import { SuperfaceTest } from '@superfaceai/testing';

/**
 * Live tests
 *
 * @group live/safe
 */

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
          },
        });

        expect(result).toMatchSnapshot({
          value: {
            channels: expect.arrayContaining([
              expect.objectContaining({
                createdAt: expect.any(Number),
                id: expect.any(String),
                name: 'announcements',
              }),
              expect.objectContaining({
                createdAt: expect.any(Number),
                id: expect.any(String),
                name: 'resources',
              }),
              expect.objectContaining({
                createdAt: expect.any(Number),
                id: expect.any(String),
                name: 'general',
              }),
            ]),
            rateLimit: expect.objectContaining({
              bucket: expect.any(String),
              remainingRequests: expect.any(Number),
              remainingRequestsPercentage: expect.any(Number),
              resetAfter: expect.any(Number),
              resetTimestamp: expect.any(Number),
              totalRequests: expect.any(Number),
            }),
          },
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
                bucket: expect.any(String),
                remainingRequests: expect.any(Number),
                remainingRequestsPercentage: expect.any(Number),
                resetAfter: expect.any(Number),
                resetTimestamp: expect.any(Number),
                totalRequests: expect.any(Number),
              }),
            }),
            statusCode: expect.any(Number),
          }),
        });
      });
    });
  });
});
