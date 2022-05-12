/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

export const getPostCommentsTest = (provider: string, postId: string): void => {
  describe(`social-media/posts-comments/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'social-media/posts-comments',
        provider,
      });
    });

    describe('GetPostComments', () => {
      describe('when a post ID is given', () => {
        it('should list all comments', async () => {
          const result = await superface.run({
            useCase: 'GetPostComments',
            input: { id: postId },
          });
          expect(result.isOk()).toBe(true);
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
