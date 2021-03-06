/* eslint-disable jest/no-export */
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const getProfilePostsTest = (
  provider: string,
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/posts/${provider}`, () => {
    let superfacePublishingProfiles: SuperfaceTest;
    let superfacePosts: SuperfaceTest;

    beforeEach(() => {
      superfacePublishingProfiles = new SuperfaceTest({
        profile: 'social-media/publishing-profiles',
        provider,
      });
      superfacePosts = new SuperfaceTest({
        profile: 'social-media/posts',
        provider,
      });
    });

    describe('GetProfilePosts', () => {
      describe('when getting latest posts', () => {
        it('should succeed', async () => {
          const result = await superfacePublishingProfiles.run({
            useCase: 'GetProfilesForPublishing',
            input: {},
          });

          expect(result.isOk()).toBeTruthy();
          const resultUnwrapped = result.unwrap();

          await expect(
            superfacePosts.run(
              {
                useCase: 'GetProfilePosts',
                input: {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                  profileId: (resultUnwrapped as any).profiles[0].id,
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
