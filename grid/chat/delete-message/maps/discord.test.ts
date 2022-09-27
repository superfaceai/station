import { SuperfaceTest } from '@superfaceai/testing';

/**
 * Live tests
 *
 * @group live/safe
 */

describe('chat/delete-message/discord', () => {
  let superface: SuperfaceTest;

  describe('DeleteMessage', () => {
    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'chat/delete-message',
        provider: 'discord',
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
          provider: 'discord',
        });

        const result = await prepare.run({
          input: {
            destination: '935962220104396885',
            text: 'test DeleteMessage',
          },
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
              destination: '935962220104396885',
              messageId,
            },
          },
          { hideInput: ['messageId'] }
        );

        expect(result.isOk).toBeTruthy();
        expect(result).toMatchSnapshot({
          value: {
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
              destination: '000000000000000000',
              messageId: '000000000000000000',
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
              detail: 'Unknown Channel',
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

    describe('when specified message id does not exist', () => {
      it('returns error', async () => {
        const result = await superface.run(
          {
            input: {
              destination: '935962220104396885',
              messageId: '000000000000000000',
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
              detail: 'Unknown Message',
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
