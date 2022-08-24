import { SuperfaceTest } from '@superfaceai/testing';

/**
 * Live tests
 *
 * @group live/safe
 */

describe('chat/delete-message/slack', () => {
  let superface: SuperfaceTest;

  describe('DeleteMessage', () => {
    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'chat/delete-message',
        provider: 'slack',
        useCase: 'DeleteMessage',
        testInstance: expect,
      });
    });

    describe('when specified destination does exist', () => {
      let messageId: string;

      beforeEach(async () => {
        const prepare = new SuperfaceTest({
          profile: 'chat/send-message',
          useCase: 'SendMessage',
          provider: 'slack',
        });

        const result = await prepare.run({
          input: { destination: 'C03UL8E5YMR', text: 'test DeleteMessage' },
          testName: 'prepare-chat/delete-chat/send',
        });

        if (result.isOk()) {
          messageId = (result.value as any).messageId;
        }
      });

      it('performs correctly', async () => {
        const result = await superface.run(
          {
            profile: 'chat/delete-message',
            useCase: 'DeleteMessage',
            input: {
              destination: 'C03UL8E5YMR',
              messageId,
            },
          },
          { hideInput: ['messageId'] }
        );

        expect(result.isOk).toBeTruthy();

        expect(result).toMatchSnapshot({
          value: {},
        });
      });
    });

    describe('when specified destination does not exist', () => {
      it('returns error', async () => {
        const result = await superface.run(
          {
            input: {
              destination: 'not-existing-dest',
              messageId: '...',
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

    describe('when specified message id does not exist', () => {
      it('returns error', async () => {
        const result = await superface.run(
          {
            input: {
              destination: 'C03UL8E5YMR',
              messageId: 'not-existing-id',
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
