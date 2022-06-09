/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

export const getRepliesTest = (provider: string, postId: string): void => {
  describe(`social-media/replies/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'social-media/replies',
        provider,
      });
    });

    describe('GetPostComments', () => {
      describe('when a post ID is given', () => {
        it('should list all comments', async () => {
          const result = await superface.run({
            useCase: 'GetPostComments',
            input: { parentId: postId },
          });
          expect(result.isOk()).toBe(true);
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
