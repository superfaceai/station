/* eslint-disable jest/no-export */
import { SuperfaceTest } from '@superfaceai/testing';

export const publishingProfilesTest = (provider: string): void => {
  describe(`social-media/publishing-profiles/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'social-media/publishing-profiles',
        provider,
      });
    });

    describe('GetProfilesForPublishing', () => {
      describe('when access token is valid', () => {
        it('should return profiles', async () => {
          await expect(
            superface.run({
              useCase: 'GetProfilesForPublishing',
              input: {},
            })
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
