import { SuperfaceTest } from '@superfaceai/testing';

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

        expect(result).toMatchSnapshot({
          value: expect.arrayContaining([
            expect.objectContaining({
              createdAt: expect.any(Number),
              id: expect.any(String),
              membersCount: expect.any(Number),
              name: expect.any(String),
            }),
          ]),
        });
      });
    });
  });
});
