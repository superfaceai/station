/* eslint-disable jest/no-export */
import { SuperfaceTest } from '@superfaceai/testing';

type InputOptions = {
  usernames?: string[];
};

export const profilesTest = (provider: string, input: InputOptions): void => {
  describe(`social-media/profiles-by-username/${provider}`, () => {
    let superfaceProfiles: SuperfaceTest;

    beforeEach(() => {
      superfaceProfiles = new SuperfaceTest({
        profile: 'social-media/profiles-by-username',
        provider,
      });
    });

    describe('GetProfilesByUsername', () => {
      describe('when access token is valid', () => {
        it('returns a list of profiles', async () => {
          await expect(
            superfaceProfiles.run({
              useCase: 'GetProfilesByUsername',
              input: {
                usernames: input.usernames,
              },
            })
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
