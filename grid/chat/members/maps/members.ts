/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getMembersTest = (
  provider: string,
  options?: {server?: string, recordingOptions?: RecordingProcessOptions}
): void => {
  describe(`chat/members/${provider}`, () => {
    let superface: SuperfaceTest;

    describe('GetMembers', () => {
      beforeAll(() => {
        superface = new SuperfaceTest({
          profile: 'chat/members',
          provider,
          useCase: 'GetMembers',
          testInstance: expect,
        });
      });

      it('performs correctly', async () => {
        const page1 = await superface.run(
          {
            input: {
              server: options?.server,
              limit: 1,
            },
            testName: 'page 1',
          },
          options?.recordingOptions
        );

        expect(page1.isOk).toBeTruthy();
        expect(page1).toMatchSnapshot();

        /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
        const cursor = page1.isOk()
          ? (page1.value as any).nextPage
          : undefined;

        if (!cursor) {
          return;
        }

        const page2 = await superface.run(
          {
            input: {
              server: options?.server,
              limit: 1,
              page: cursor,
            },
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
