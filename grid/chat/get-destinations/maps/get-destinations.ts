/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getDestinationsTest = (
  provider: string,
  options?: { server?: string; recordingOptions?: RecordingProcessOptions }
): void => {
  describe(`chat/get-destinations/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetDestinations', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'chat/get-destinations',
          provider,
          useCase: 'GetDestinations',
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
