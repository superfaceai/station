/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getThreadsTest = (
  provider: string,
  server: string,
  options?: RecordingProcessOptions
): void => {
  describe(`chat/threads/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetThreads', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'chat/threads',
          provider,
          useCase: 'GetThreads',
          testInstance: expect,
        });
      });

      it('performs correctly', async () => {
        await expect(
          superface.run(
            {
              input: {
                server,
              },
            },
            options
          )
        ).resolves.toMatchSnapshot();
      });

      it('fails', async () => {
        await expect(
          superface.run(
            {
              input: {
                server: 'not-existing-server-id',
              },
            },
            options
          )
        ).resolves.toMatchSnapshot();
      });
    });
  });
};
