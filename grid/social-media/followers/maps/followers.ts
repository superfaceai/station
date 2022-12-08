/* eslint-disable jest/no-export */
import { SuperfaceTest } from '@superfaceai/testing';
import { RecordingType } from '@superfaceai/testing/dist/nock/recording.interfaces';
import { buildSuperfaceTest } from '../../../test-config';

export const followersTest = (provider: string): void => {
  describe(`social-media/followers/${provider}`, () => {
    let superfacePublishingProfiles: SuperfaceTest;
    let superfaceFollowers: SuperfaceTest;

    beforeEach(() => {
      superfacePublishingProfiles = buildSuperfaceTest({
        profile: 'social-media/publishing-profiles',
        provider,
      });
      superfaceFollowers = buildSuperfaceTest({
        profile: 'social-media/followers',
        provider,
      });
    });

    describe('GetFollowers', () => {
      describe('when access token is valid', () => {
        it('should return followers', async () => {
          const result = await superfacePublishingProfiles.run(
            {
              useCase: 'GetProfilesForPublishing',
              input: {},
            },
            {
              recordingType: RecordingType.PREPARE,
            }
          );

          expect(result.isOk()).toBeTruthy();
          const resultUnwrapped = result.unwrap();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          const profileId: any = (resultUnwrapped as any).profiles[0].id;
          await expect(
            superfaceFollowers.run({
              useCase: 'GetFollowers',
              input: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                profileId,
              },
            })
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
