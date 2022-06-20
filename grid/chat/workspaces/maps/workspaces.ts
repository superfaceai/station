/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getWorkspacesTest = (
  provider: string,
  options?: RecordingProcessOptions
): void => {
  describe(`chat/workspaces/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetWorkspaces', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'chat/workspaces',
          provider,
          useCase: 'GetWorkspaces',
          testInstance: expect,
        });
      });

      it('performs correctly', async () => {
        await expect(
          superface.run(
            {
              input: {},
            },
            options
          )
        ).resolves.toMatchSnapshot();
      });
    });
  });
};
