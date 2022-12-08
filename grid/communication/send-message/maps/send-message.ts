/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const sendMessage = (
  provider: string,
  params: { destination: string }
): void => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'communication/send-message',
      provider,
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
