import { SuperfaceTest } from '@superfaceai/testing';

const provider = 'linkedin';
// DevTestCo - https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/organizations#test-organizations
const profileId = 'urn:li:organization:2414183';

describe(`social-media/posts/${provider}`, () => {
  let superfacePosts: SuperfaceTest;

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
        for (let i = 0, page = null; i < 2; i++) {
          const result = await superfacePosts.run({
            useCase: 'GetProfilePosts',
            input: {
              profileId,
              page,
            },
          });
          expect(result.isOk()).toBe(true);
          const resultUnwrapped = result.unwrap() as any;
          page = resultUnwrapped.nextPage;
          expect(page).toBeTruthy();
        }
      });
    });
  });
});
