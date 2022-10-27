/* eslint-disable jest/no-export */
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';
import { nockConfig } from '../../../test-config';

type PartialResult = {
  posts: Array<{ replyId?: string; parentId?: string }>;
};

export const postsLookupTest = (
  provider: string,
  inputs: {
    profileId?: string;
  },
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/posts-lookup/${provider}`, () => {
    let superfacePostsLookup: SuperfaceTest;

    beforeEach(() => {
      superfacePostsLookup = new SuperfaceTest(
        {
          profile: 'social-media/posts-lookup',
          provider,
        },
        nockConfig
      );
    });

    describe('FindByHashtag', () => {
      describe('when searching latest posts by hashtag #apis', () => {
        it('should succeed', async () => {
          await expect(
            superfacePostsLookup.run(
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
            superfacePostsLookup.run(
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
        it('keeps replyId in sync with parentId for backward compatibility', async () => {
          const result = await superfacePostsLookup.run(
            {
              useCase: 'FindByMention',
              input: {
                profileId: inputs.profileId,
              },
            },
            hooks
          );
          expect(result.isOk()).toBe(true);
          const data = result.unwrap() as PartialResult;

          // Try to find a post which is a reply
          const replyPost = data.posts.find(post => post.replyId);
          // FIXME: Conditional test is not ideal, perhaps this can be moved under more appropriate lookup
          if (replyPost) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(replyPost.replyId).toBe(replyPost.parentId);
          }
        });
      });
    });
  });
};
