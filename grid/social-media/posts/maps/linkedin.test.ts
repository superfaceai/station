import { SuperfaceTest } from '@superfaceai/testing';

const provider = 'linkedin';
// DevTestCo - https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/organizations#test-organizations
const profileId = 'urn:li:organization:2414183';

describe(`social-media/posts/${provider}`, () => {
  let superfacePosts: SuperfaceTest;

  beforeAll(() => {
    // LinkedIn API tends to be sluggish
    jest.setTimeout(20 * 1000);
  });

  beforeEach(() => {
    superfacePosts = new SuperfaceTest({
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

      it('correctly paginates', async () => {
        for (let i = 0, page = null, firstId = null; i < 3; i++) {
          const result = await superfacePosts.run({
            useCase: 'GetProfilePosts',
            input: {
              profileId,
              page,
            },
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
  });
});
