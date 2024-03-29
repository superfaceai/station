/* eslint-disable @typescript-eslint/no-unsafe-call */
import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

const provider = 'linkedin';
// DevTestCo - https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/organizations#test-organizations
const profileId = 'urn:li:organization:2414183';

// LinkedIn API tends to be sluggish
jest.setTimeout(20 * 1000);

describe(`social-media/posts/${provider}`, () => {
  let superfacePosts: SuperfaceTest;

  beforeEach(() => {
    superfacePosts = buildSuperfaceTest({
      profile: 'social-media/posts',
      provider,
    });
  });

  describe('GetProfilePosts', () => {
    describe('when getting latest posts', () => {
      it('succeeds', async () => {
        await expect(
          superfacePosts.run({
            useCase: 'GetProfilePosts',
            input: {
              profileId,
            },
          })
        ).resolves.toMatchSnapshot();
      });

      it('resolves attachments URLs', async () => {
        const result = await superfacePosts.run({
          useCase: 'GetProfilePosts',
          input: {
            profileId,
          },
        });
        expect(result.isOk()).toBe(true);
        const data = result.unwrap() as any;
        const imagePost = data.posts.find(
          (p: {
            attachments: undefined | Array<{ type: string; url?: string }>;
          }) => p.attachments?.some((a: { type: string }) => a.type === 'image')
        );
        expect(imagePost).toBeTruthy();
        expect(imagePost.attachments[0].url).toBeTruthy();
      });

      it('correctly paginates', async () => {
        for (let i = 0, page = null, firstId = null; i < 3; i++) {
          const result = await superfacePosts.run({
            useCase: 'GetProfilePosts',
            input: {
              profileId,
              page,
            },
            testName: `GetProfilePosts-${i}`,
          });
          expect(result.isOk()).toBe(true);
          const resultUnwrapped = result.unwrap() as any;
          // nextPage
          expect(resultUnwrapped.nextPage).toBeTruthy();
          page = resultUnwrapped.nextPage;
          // previous page
          if (i === 0) {
            expect(resultUnwrapped.previousPage).toBeUndefined();
          } else {
            expect(resultUnwrapped.previousPage).toBeTruthy();
          }
          // posts sanity check
          expect(resultUnwrapped.posts.length).toBeGreaterThan(0);
          // check that we are not cycling on the same page
          const newFirstId = resultUnwrapped.posts[0].id;
          expect(newFirstId).not.toEqual(firstId);
          firstId = newFirstId;
        }
      });
    });

    describe('error states', () => {
      it('expects error for inaccessible profile', async () => {
        await expect(
          superfacePosts.run({
            useCase: 'GetProfilePosts',
            input: {
              // any person profile will do here
              profileId: 'urn:li:person:QIMLoK7PG6',
            },
          })
        ).resolves.toMatchSnapshot();
      });
    });
  });
});
