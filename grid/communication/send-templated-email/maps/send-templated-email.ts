/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const sendTemplatedEmailTest = (
  provider: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: { from: string; to: string; templateId: string; [key: string]: any },
  options?: RecordingProcessOptions
): void => {
  describe(`communication/send-templated-email/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(async () => {
      superface = new SuperfaceTest({
        profile: 'communication/send-templated-email',
        provider,
        testInstance: expect,
      });
    });

    describe('SendTemplatedEmail', () => {
      describe('when all inputs are correct', () => {
        it('should return messageId as result', async () => {
          const input = {
            ...params,
            templateData: params,
          };

          await expect(
            superface.run(
              {
                useCase: 'SendTemplatedEmail',
                input,
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });
      });

      describe('when inputs are invalid', () => {
        it('should throw error', async () => {
          const input = {
            ...params,
            to: 'invalidemail',
            from: 'invalidemail',
            templateId: 'invalid',
            templateData: undefined,
          };

          await expect(
            superface.run(
              {
                useCase: 'SendTemplatedEmail',
                input,
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
