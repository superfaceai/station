/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

export const getChannelsTest = (
  provider: string,
  options?: { workspace?: string; recordingOptions?: RecordingProcessOptions }
): void => {
  describe(`chat/channels/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetChannels', () => {
      beforeAll(() => {
        superface = new SuperfaceTest(
          {
            profile: 'chat/channels',
            provider,
            useCase: 'GetChannels',
          },
          nockConfig
        );
      });

      it('performs correctly', async () => {
        await expect(
          superface.run(
            {
              input: {
                workspace: options?.workspace,
                visibility: 'public',
                limit: 4,
              },
            },
            options?.recordingOptions
          )
        ).resolves.toMatchSnapshot();
      });
    });
  });
};
