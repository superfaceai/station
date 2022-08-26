import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

describe('communication/send-sms/plivo', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'communication/send-sms',
        provider: 'plivo',
      },
      nockConfig
    );
  });

  describe('SendMessage', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'SendMessage',
          input: {
            to: '+4915207930698', // https://receive-smss.com/sms/4915207930698/
            from: 'Plivo APIs',
            text: 'Hello World!',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });

  describe('RetrieveMessageStatus', () => {
    it('should perform successfully', async () => {
      const result = await superface.run({
        useCase: 'SendMessage',
        input: {
          to: '+4915207930698', // https://receive-smss.com/sms/4915207930698/
          from: 'Plivo APIs 2',
          text: 'Hello World!',
        },
      });

      const messageId = (result.unwrap() as any).messageId;

      await expect(
        superface.run({
          useCase: 'RetrieveMessageStatus',
          input: {
            messageId,
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
