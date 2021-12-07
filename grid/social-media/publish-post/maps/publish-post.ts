/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

type InstagramFeedId = {
  accessToken: string;
  businessAccountId: string;
};

type FacebookFeedId = {
  accessToken: string;
  pageId?: string;
  groupId?: string;
};

export const publishPostTest = (
  provider: string,
  feed: InstagramFeedId | FacebookFeedId,
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/publish-post/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      jest.setTimeout(20000);
      superface = new SuperfaceTest();
    });

    describe('PublishPost', () => {
      describe('when publishing post including image', () => {
        it('should succeed', async () => {
          const input = {
            feed,
            text: 'Sitta carolinensis',
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/0/09/Sitta-carolinensis-001.jpg',
          };

          await expect(
            superface.run(
              {
                profile: 'social-media/publish-post',
                provider,
                useCase: 'PublishPost',
                input,
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });

      describe('when publishing text message', () => {
        it('should succeed', async () => {
          const input = {
            feed,
            text: 'Hello world!',
          };

          await expect(
            superface.run(
              {
                profile: 'social-media/publish-post',
                provider,
                useCase: 'PublishPost',
                input,
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
