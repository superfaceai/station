/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const getRepliesTest = (provider: string, postId: string): void => {
  describe(`social-media/replies/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'social-media/replies',
        provider,
      });
    });

    describe('GetPostReplies', () => {
      describe('when a post ID is given', () => {
        it('should list all replies', async () => {
          const result = await superface.run({
            useCase: 'GetPostReplies',
            input: { parentId: postId },
          });
          expect(result.isOk()).toBe(true);
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
