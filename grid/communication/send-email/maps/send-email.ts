/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';
import { nockConfig } from '../../../test-config';

export const sendEmailTest = (
  provider: string,
  params: {
    from: string;
    to: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  },
  options?: RecordingProcessOptions
): void => {
  describe(`communication/send-email/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest(
        {
          profile: 'communication/send-email',
          provider,
        },
        nockConfig
      );
    });

    describe('SendEmail', () => {
      describe('when all inputs are correct', () => {
        it('should return messageId as result', async () => {
          const input = {
            ...params,
            subject: 'Station test',
            text: `Station test - ${provider}`,
          };

          await expect(
            superface.run(
              {
                useCase: 'SendEmail',
                input,
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });

        it('sends email with attachments', async () => {
          const input = {
            ...params,
            subject: 'Station test with attachements',
            text: `Station test - ${provider}`,
            attachments: [
              {
                content: 'dGVzdA==',
                type: 'text/plain',
                filename: 'test.txt',
              },
              {
                content: 'dGVzdC==',
                type: 'application/json',
                filename: 'test2.json',
              },
            ],
          };

          await expect(
            superface.run(
              {
                profile: 'communication/send-email',
                provider,
                useCase: 'SendEmail',
                input,
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });

    describe('when inputs are invalid', () => {
      it('should throw an exception', async () => {
        const input = {
          ...params,
          to: 'invalidemail',
          from: 'invalidemail',
          subject: '',
          text: '',
        };

        await expect(
          superface.run(
            {
              useCase: 'SendEmail',
              input,
            },
            options
          )
        ).resolves.toMatchSnapshot();
      });
    });
  });
};
