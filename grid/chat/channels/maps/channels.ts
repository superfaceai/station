/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getChannelsTest = (
  provider: string,
  options?: { server?: string; recordingOptions?: RecordingProcessOptions }
): void => {
  describe(`chat/channels/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetChannels', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'chat/channels',
          provider,
          useCase: 'GetChannels',
        });
      });

      it('performs correctly', async () => {
        await expect(
          superface.run(
            {
              input: {
                server: options?.server,
                types: ['public'],
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
