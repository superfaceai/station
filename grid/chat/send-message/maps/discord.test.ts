import { SuperfaceTest } from '@superfaceai/testing';

/**
 * Live tests
 *
 * @group live/safe
 */

const destination = '935962220104396885';
const provider = 'discord';

describe(`chat/send-message/${provider}`, () => {
  let superface: SuperfaceTest;
  let teardown: SuperfaceTest;

  describe('SendMessage', () => {
    let messageId: string;

    beforeAll(() => {
      superface = new SuperfaceTest({
        profile: 'chat/send-message',
        provider,
        useCase: 'SendMessage',
        testInstance: expect,
      });

      teardown = new SuperfaceTest({
        profile: 'chat/delete-message',
        provider,
        useCase: 'DeleteMessage',
      });
    });

    describe('when specified destination does exist', () => {
      afterEach(async () => {
        await teardown.run(
          {
            input: { destination, messageId },
            testName: 'teardown-chat/send-chat/delete',
          },
          { hideInput: ['messageId'] }
        );
      });

      it('performs correctly', async () => {
        const result = await superface.run({
          input: {
            destination,
            text: 'test',
          },
        });

        expect(result.isOk()).toBeTruthy();

        if (result.isOk()) {
          messageId = (result.value as any).messageId;
        }

        expect(result).toMatchSnapshot({
          value: expect.objectContaining({
            destination,
            messageId: expect.any(String),
            rateLimit: expect.objectContaining({
              bucket: expect.any(String),
              remainingRequests: expect.any(Number),
              remainingRequestsPercentage: expect.any(Number),
              resetAfter: expect.any(Number),
              resetTimestamp: expect.any(Number),
              totalRequests: expect.any(Number),
            }),
          }),
        });
      });
    });

    describe('when specified destination does not exist', () => {
      it('returns error', async () => {
        const result = await superface.run(
          {
            input: {
              destination: '000000000000000000',
              text: 'test',
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
