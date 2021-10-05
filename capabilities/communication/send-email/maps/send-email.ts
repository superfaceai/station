/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing-lib';

export const sendEmailTest = (
  provider: string,
  params: { from: string; to: string; [key: string]: any }
): void => {
  describe(`communication/send-email/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest();
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
            superface.run({
              profile: 'communication/send-email',
              provider,
              useCase: 'SendEmail',
              input,
            })
          ).resolves.toMatchSnapshot();
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
            superface.run({
              profile: 'communication/send-email',
              provider,
              useCase: 'SendEmail',
              input,
            })
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
