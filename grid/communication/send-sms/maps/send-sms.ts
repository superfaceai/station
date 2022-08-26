/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

export const sendSmsTest = (
  provider: string,
  sender: string,
  _options?: RecordingProcessOptions
): void => {
  describe(`communication/send-sms/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest(
        {
          profile: 'communication/send-sms',
          provider,
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
              from: sender,
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
            from: sender,
            text: 'Hello World!',
          },
        });

        const messageId = (result.unwrap() as { messageId: string }).messageId;

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
};
