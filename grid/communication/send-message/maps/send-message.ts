/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

export const sendMessage = (
  provider: string,
  params: { destination: string }
): void => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'communication/send-message',
        provider,
      },
      nockConfig
    );
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
