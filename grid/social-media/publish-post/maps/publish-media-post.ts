/* eslint-disable jest/no-export */
import {
  RecordingProcessOptions,
  SuperfaceTest,
  SuperfaceTestRun,
} from '@superfaceai/testing';
import { readFile } from 'fs/promises';
import path from 'path';

import { buildSuperfaceTest } from '../../../test-config';
import { getPublishingProfiles } from './publish-post';

async function fixturesToMedia(
  fixtureNames: string[]
): Promise<Array<{ contents: Buffer; altText: string }>> {
  const buffers = await Promise.all(
    fixtureNames.map(fixture => {
      const fixturePath = path.join(__dirname, 'fixtures', fixture);

      return readFile(fixturePath);
    })
  );

  return fixtureNames.map((name, i) => {
    return { contents: buffers[i], altText: name };
  });
}

const defaultInput = Object.freeze({
  text: `Test media publishing from Superface Station.`,
  media: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Sitta-carolinensis-001.jpg',
    },
  ],
});

export const publishMediaPostTest = (
  provider: string,
  input: SuperfaceTestRun['input'] = defaultInput,
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/publish-post/${provider}`, () => {
    let superfacePublisPost: SuperfaceTest;

    beforeAll(() => {
      jest.setTimeout(15000);
    });

    afterAll(() => {
      jest.setTimeout(5000);
    });

    beforeEach(() => {
      superfacePublisPost = buildSuperfaceTest({
        profile: 'social-media/publish-post',
        provider,
      });
    });

    describe('PublishPost', () => {
      describe('when publishing media post', () => {
        it('should succeed', async () => {
          const profiles = await getPublishingProfiles(provider);

          const result = await superfacePublisPost.run(
            {
              useCase: 'PublishPost',
              input: {
                profileId: profiles[0].id,
                ...input,
              },
            },
            hooks
          );
          expect(result.isOk()).toBe(true);
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};

type UploadTestCase = {
  name: string;
  media: string[];
  success?: boolean;
};

export const publishMediaUploadTest = (
  provider: string,
  cases: UploadTestCase[],
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/publish-post/${provider}`, () => {
    let superfacePublisPost: SuperfaceTest;

    beforeEach(() => {
      superfacePublisPost = buildSuperfaceTest({
        profile: 'social-media/publish-post',
        provider,
      });
    });

    const testCases = cases.map(
      ({ name, media, success = true }) => [name, media, success] as const
    );

    describe('PublishPost', () => {
      describe('media upload', () => {
        // FIXME: Use $name in Jest 27+
        test.each(testCases)('%s', async (name, fixtureFiles, success) => {
          const profiles = await getPublishingProfiles(provider);

          const media = await fixturesToMedia(fixtureFiles);
          const result = await superfacePublisPost.run(
            {
              useCase: 'PublishPost',
              input: {
                profileId: profiles[0].id,
                text: `Test media publishing from Superface Station (${name})`,
                media,
              },
            },
            hooks
          );
          expect(result.isOk()).toBe(success);
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
