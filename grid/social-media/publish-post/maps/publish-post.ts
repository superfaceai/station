/* eslint-disable jest/no-export */
import { SuperfaceTest } from '@superfaceai/testing';

export const publishPostTest = (provider: string): void => {
  describe(`social-media/publish-post/${provider}`, () => {
    let superfacePublishingProfiles: SuperfaceTest;
    let superfacePublisPost: SuperfaceTest;

    beforeEach(() => {
      superfacePublishingProfiles = new SuperfaceTest({
        profile: 'social-media/publishing-profiles',
        provider,
      });
      superfacePublisPost = new SuperfaceTest({
        profile: 'social-media/publish-post',
        provider,
      });
    });

    describe('PublishPost', () => {
      describe('when publishing text post', () => {
        it('should return succeed', async () => {
          const result = await superfacePublishingProfiles.run({
            useCase: 'GetProfilesForPublishing',
            input: {},
          });

          expect(result.isOk()).toBeTruthy();
          const resultUnwrapped = result.unwrap();

          await expect(
            superfacePublisPost.run({
              useCase: 'PublishPost',
              input: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                profileId: (resultUnwrapped as any).profiles[0].id,
                text: `Test from Superface Station.`,
              },
            })
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
