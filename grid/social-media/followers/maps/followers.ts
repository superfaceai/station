/* eslint-disable jest/no-export */
import { SuperfaceTest } from '@superfaceai/testing';

export const followersTest = (provider: string): void => {
  describe(`social-media/followers/${provider}`, () => {
    let superfacePublishingProfiles: SuperfaceTest;
    let superfaceFollowers: SuperfaceTest;

    beforeEach(() => {
      superfacePublishingProfiles = new SuperfaceTest({
        profile: 'social-media/publishing-profiles',
        provider,
      });
      superfaceFollowers = new SuperfaceTest({
        profile: 'social-media/followers',
        provider,
      });
    });

    describe('GetFollowers', () => {
      describe('when access token is valid', () => {
        it('should return followers', async () => {
          const result = await superfacePublishingProfiles.run({
            useCase: 'GetProfilesForPublishing',
            input: {},
          });

          expect(result.isOk()).toBeTruthy();
          const resultUnwrapped = result.unwrap();

          await expect(
            superfaceFollowers.run({
              useCase: 'GetFollowers',
              input: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                profileId: (resultUnwrapped as any).profiles[0].id,
              },
            })
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
