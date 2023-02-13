/* eslint-disable jest/no-export */
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';
import { RecordingType } from '@superfaceai/testing/dist/nock/recording.interfaces';

import { buildSuperfaceTest } from '../../../test-config';

export const getProfilePostsTest = (
  provider: string,
  profileName?: string,
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/posts/${provider}`, () => {
    let superfacePublishingProfiles: SuperfaceTest;
    let superfacePosts: SuperfaceTest;

    beforeEach(() => {
      superfacePublishingProfiles = buildSuperfaceTest({
        profile: 'social-media/publishing-profiles',
        provider,
      });
      superfacePosts = buildSuperfaceTest({
        profile: 'social-media/posts',
        provider,
      });
    });

    describe('GetProfilePosts', () => {
      describe('when getting latest posts', () => {
        it('should succeed', async () => {
          const result = await superfacePublishingProfiles.run(
            {
              useCase: 'GetProfilesForPublishing',
              input: {},
            },
            { recordingType: RecordingType.PREPARE }
          );

          expect(result.isOk()).toBeTruthy();
          const resultUnwrapped = result.unwrap() as {
            profiles: [
              {
                id: string,
                name: string
              }
            ]
          };

          let profile;
          if(profileName) {
            profile = resultUnwrapped.profiles.find(profile => profile.name === profileName)
          } else {
            profile = resultUnwrapped.profiles[0];
          }

          expect(profile).toBeDefined();

          await expect(
            superfacePosts.run(
              {
                useCase: 'GetProfilePosts',
                input: {
                  profileId: profile?.id,
                },
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
