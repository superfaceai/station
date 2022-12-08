/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const getThreadsTest = (
  provider: string,
  workspaces: [valid: string, invalid: string],
  options?: RecordingProcessOptions
): void => {
  describe(`chat/threads/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetThreads', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'chat/threads',
          provider,
          useCase: 'GetThreads',
        });
      });

      it('performs correctly', async () => {
        await expect(
          superface.run(
            {
              input: {
                workspace: workspaces[0],
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
                workspace: workspaces[1],
              },
            },
            options
          )
        ).resolves.toMatchSnapshot();
      });
    });
  });
};
