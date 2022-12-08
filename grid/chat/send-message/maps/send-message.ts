/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const sendMessageTest = (
  provider: string,
  destination: {
    valid: string;
    invalid: string;
  },
  options?: RecordingProcessOptions
): void => {
  describe(`chat/send-message/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('SendMessage', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'chat/send-message',
          provider,
          useCase: 'SendMessage',
        });
      });

      describe('when specified destination does exist', () => {
        it('performs correctly', async () => {
          await expect(
            superface.run(
              {
                input: {
                  destination: destination.valid,
                  text: 'test',
                },
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });
      });

      describe('when specified destination does not exist', () => {
        it('returns error', async () => {
          await expect(
            superface.run(
              {
                input: {
                  destination: destination.invalid,
                  text: 'test',
                },
              },
              options
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
