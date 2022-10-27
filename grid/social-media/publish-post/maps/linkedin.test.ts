import { SuperfaceTest } from '@superfaceai/testing';
import { readFile } from 'fs/promises';
import path from 'path';
import { nockConfig } from '../../../test-config';

import { publishPostErrorTest } from './publish-post';

const provider = 'linkedin';
// DevTestCo - https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/organizations#test-organizations
const profileId = 'urn:li:organization:2414183';
const fixtures = ['horizontal.jpg', 'vertical.jpg'];

async function loadFixtures(fixtureNames: string[]): Promise<Buffer[]> {
  return Promise.all(
    fixtureNames.map(fixture => {
      const fixturePath = path.join(__dirname, 'fixtures', fixture);

      return readFile(fixturePath);
    })
  );
}

describe(`social-media/posts/${provider}`, () => {
  let superfacePublishPost: SuperfaceTest;

  beforeAll(() => {
    // LinkedIn API tends to be sluggish
    jest.setTimeout(20 * 1000);
  });

  beforeEach(() => {
    superfacePublishPost = new SuperfaceTest(
      {
        profile: 'social-media/publish-post',
        provider,
      },
      nockConfig
    );
  });

  describe('PublishPost', () => {
    describe('text-only post', () => {
      it('works', async () => {
        const result = await superfacePublishPost.run({
          useCase: 'PublishPost',
          input: {
            profileId,
            text: `Test from Superface Station 7`,
          },
        });
        expect(result.isOk()).toBe(true);
        expect(result).toMatchSnapshot();
      });
    });

    describe('post with a link', () => {
      it('works', async () => {
        const result = await superfacePublishPost.run({
          useCase: 'PublishPost',
          input: {
            profileId,
            text: 'This is a post with a link to an example domain.',
            link: 'https://example.com',
          },
        });
        expect(result.isOk()).toBe(true);
        expect(result).toMatchSnapshot();
      });
    });

    describe('post with images', () => {
      let media: Array<{ contents: Buffer }>;
      beforeAll(async () => {
        media = (await loadFixtures(fixtures)).map(contents => {
          return { contents };
        });
      });

      it('uploads and posts media', async () => {
        const result = await superfacePublishPost.run({
          useCase: 'PublishPost',
          input: {
            profileId,
            text: 'This is a post with two images',
            media,
          },
        });

        expect(result.isOk()).toBe(true);
        expect(result).toMatchSnapshot();
      });

      it('keeps the link if media is present', async () => {
        const result = await superfacePublishPost.run({
          useCase: 'PublishPost',
          input: {
            profileId,
            text: 'This is a post with an image and a link.',
            link: 'https://example.com',
            media: [media[0]],
          },
        });
        expect(result.isOk()).toBe(true);
        expect(result).toMatchSnapshot();
      });
    });
  });
});

publishPostErrorTest(provider, [
  {
    name: 'invalid profileId ends in not found error',
    input: {
      profileId: '4',
      text: `Test media publishing from Superface Station.`,
    },
  },
]);
