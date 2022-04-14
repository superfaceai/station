/* eslint-disable jest/no-export */
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

export const publishMediaPostTest = (
  provider: string,
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/publish-post/${provider}`, () => {
    let superfacePublishingProfiles: SuperfaceTest;
    let superfacePublisPost: SuperfaceTest;

    beforeAll(() => {
      jest.setTimeout(15000);
    });

    afterAll(() => {
      jest.setTimeout(5000);
    });

    beforeEach(() => {
      superfacePublishingProfiles = new SuperfaceTest({
        profile: 'social-media/publishing-profiles',
        provider,
      });
      superfacePublisPost = new SuperfaceTest({
        profile: 'social-media/publish-post',
        provider,
      });
    });

    describe('PublishPost', () => {
      describe.only('when publishing media post', () => {
        it('should succeed', async () => {
          const result = await superfacePublishingProfiles.run({
            useCase: 'GetProfilesForPublishing',
            input: {},
          });

          // expect(result.isOk()).toBeTruthy();
          const resultUnwrapped = result.unwrap();

          await expect(
            superfacePublisPost.run(
              {
                useCase: 'PublishPost',
                input: {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                  profileId: (resultUnwrapped as any).profiles[0].id,
                  text: `Test media publishing from Superface Station.`,
                  media: [
                    {
                      url:
                        'https://upload.wikimedia.org/wikipedia/commons/0/09/Sitta-carolinensis-001.jpg',
                    },
                  ],
                },
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
