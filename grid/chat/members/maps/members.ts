/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const getMembersTest = (
  provider: string,
  options?: { workspace?: string; recordingOptions?: RecordingProcessOptions }
): void => {
  describe(`chat/members/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetMembers', () => {
      beforeAll(() => {
        superface = buildSuperfaceTest({
          profile: 'chat/members',
          provider,
          useCase: 'GetMembers',
        });
      });

      it('performs correctly', async () => {
        const input: Record<string, number | string> = {
          limit: 1,
        };

        if (typeof options?.workspace === 'string') {
          input.workspace = options?.workspace;
        }

        const page1 = await superface.run(
          {
            input,
            testName: 'page 1',
          },
          options?.recordingOptions
        );

        expect(page1.isOk).toBeTruthy();
        expect(page1).toMatchSnapshot();

        /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
        const cursor = page1.isOk() ? (page1.value as any).nextPage : undefined;

        if (!cursor) {
          return;
        }

        input.page = cursor;

        const page2 = await superface.run(
          {
            input,
            testName: 'page 2',
          },
          options?.recordingOptions
        );

        expect(page2.isOk).toBeTruthy();
        expect(page2).toMatchSnapshot();
      });
    });
  });
};
