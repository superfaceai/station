/* eslint-disable jest/no-export */
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const postsLookupTest = (
  provider: string,
  inputs: {
    profileId?: string;
  },
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/posts-lookup/${provider}`, () => {
    let superfaceContentSearch: SuperfaceTest;

    beforeEach(() => {
      superfaceContentSearch = new SuperfaceTest({
        profile: 'social-media/posts-lookup',
        provider,
      });
    });

    describe('FindByHashtag', () => {
      describe('when searching latest posts by hashtag #apis', () => {
        it('should succeed', async () => {
          await expect(
            superfaceContentSearch.run(
              {
                useCase: 'FindByHashtag',
                input: {
                  hashtag: 'apis',
                },
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });

    describe('FindByMention', () => {
      describe('when searching latest posts by mentions', () => {
        it('should succeed', async () => {
          await expect(
            superfaceContentSearch.run(
              {
                useCase: 'FindByMention',
                input: {
                  profileId: inputs.profileId,
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
