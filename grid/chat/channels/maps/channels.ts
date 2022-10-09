/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getChannelsTest = (
  provider: string,
  destination?: { valid: string; invalid: string },
  options?: RecordingProcessOptions
) => {
  describe(`chat/channels/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetChannels', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'chat/channels',
          provider,
          useCase: 'GetChannels',
          testInstance: expect,
        });
      });

      describe('when specified destination does exist', () => {
        it('performs correctly', async () => {
          // Unlike Slack, Discord is not bind to one workspace and therefore
          // we need to specify which workspace we want to work with.
          // And unlike Discord, Slack offers more parameters to work with results.
          const input =
            provider === 'discord'
              ? { workspace: destination?.valid }
              : { visibility: 'public', limit: 4 };

          const result = await superface.run({ input }, options);

          expect(result.isOk()).toBeTruthy();
          expect(result).toMatchSnapshot();
        });
      });

      // This test concerns only providers which are not bind to one workspace.
      // Slack is bind to one workspace with its access token, therefore we skip this test.
      describe('when specified destination does not exist', () => {
        it('returns error', async () => {
          if (provider === 'slack') {
            return;
          }

          const result = await superface.run(
            {
              input: {
                workspace: destination?.invalid,
                visibility: 'public',
              },
            },
            options
          );

          expect(result.isErr()).toBeTruthy();
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
