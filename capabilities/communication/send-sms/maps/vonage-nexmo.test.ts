import { SuperfaceTest } from '@superfaceai/testing';

describe('communication/send-sms/vonage-nexmo', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'communication/send-sms',
      provider: 'vonage-nexmo',
    });
  });

  describe('SendMessage', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'SendMessage',
          input: {
            to: '+4915207930698', // https://receive-smss.com/sms/4915207930698/
            from: 'Vonage APIs',
            text: 'Hello World!',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });

  describe('RetrieveMessageStatus', () => {
    it('should return error saying it is not supported', async () => {
      await expect(
        superface.run({
          useCase: 'RetrieveMessageStatus',
          input: {
            messageId: 'xxx',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
