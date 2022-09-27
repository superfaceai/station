import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const sendMessageTest = (
  provider: string,
  destination: string[],
  options?: RecordingProcessOptions
) => {
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
          const result = await superface.run(
            {
              input: {
                destination: destination[0],
                text: 'test',
              },
            },
            options
          );

          expect(result.isOk()).toBeTruthy();

          if (result.isOk()) {
            messageId = (result.value as any).messageId;
          }

          expect(result).toMatchSnapshot();
        });
      });

      describe('when specified destination does not exist', () => {
        it('returns error', async () => {
          const result = await superface.run(
            {
              input: {
                destination: destination[1],
                text: 'test',
              },
            },
            options
          );

          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
