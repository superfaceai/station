/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

export const sendMessage = (
  provider: string,
  params: { destination: string }
): void => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'communication/send-message',
      provider,
      testInstance: expect,
    });
  });

  describe(`communication/send-message/${provider}`, () => {
    it('performs correctly', async () => {
      await expect(
        superface.run({
          useCase: 'SendMessage',
          input: {
            destination: params.destination,
            text: 'Station communication/send-message test',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
};
