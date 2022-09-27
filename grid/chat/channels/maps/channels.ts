/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getChannelsTest = (
  provider: string,
  destination: string[],
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
          const input =
            provider === 'discord'
              ? {
                  workspace: destination[0],
                }
              : {
                  visibility: 'public',
                  limit: 4,
                };

          const result = await superface.run({ input }, options);

          expect(result.isOk()).toBeTruthy();
          expect(result).toMatchSnapshot();
        });
      });

      describe('when specified destination does not exist', () => {
        it('returns error', async () => {
          if (provider === 'slack') {
            return;
          }

          const result = await superface.run(
            {
              input: {
                workspace: destination[1],
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
