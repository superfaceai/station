import { SuperfaceTest } from '@superfaceai/testing';

/**
 * Live tests
 *
 * @group live/safe
 */

describe('chat/channels/slack', () => {
  let superface: SuperfaceTest;

  describe('GetChannels', () => {
    beforeAll(() => {
      superface = new SuperfaceTest({
        profile: 'chat/channels',
        provider: 'slack',
        useCase: 'GetChannels',
        testInstance: expect,
      });
    });

    describe('when specified destination does exist', () => {
      it('performs correctly', async () => {
        const result = await superface.run({
          input: {
            visibility: 'public',
            limit: 4,
          },
        });

        expect(result.isOk()).toBeTruthy();

        const channels = result.isOk()
          ? (result.value as any).channels
          : result.error;

        expect(channels).toHaveLength(4);
        expect(result).toMatchSnapshot({
          value: {
            channels: expect.arrayContaining([
              expect.objectContaining({
                createdAt: expect.any(Number),
                id: expect.any(String),
                membersCount: expect.any(Number),
                name: 'business-plan',
              }),
              expect.objectContaining({
                createdAt: expect.any(Number),
                id: expect.any(String),
                membersCount: expect.any(Number),
                name: 'random',
              }),
              expect.objectContaining({
                createdAt: expect.any(Number),
                id: expect.any(String),
                membersCount: expect.any(Number),
                name: 'general',
              }),
              expect.objectContaining({
                createdAt: expect.any(Number),
                id: expect.any(String),
                membersCount: expect.any(Number),
                name: 'product',
              }),
            ]),
          },
        });
      });
    });
  });
});
