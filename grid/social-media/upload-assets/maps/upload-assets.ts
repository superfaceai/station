/* eslint-disable jest/no-export */
import {
  RecordingProcessOptions,
  SuperfaceTest,
  SuperfaceTestRun,
} from '@superfaceai/testing';

type ProfilesResult = Array<{ id: string; name: string }>;

export const getPublishingProfiles = async (
  provider: string
): Promise<ProfilesResult> => {
  const superfacePublishingProfiles = new SuperfaceTest({
    profile: 'social-media/publishing-profiles',
    provider,
  });
  const result = await superfacePublishingProfiles.run({
    useCase: 'GetProfilesForPublishing',
    input: {},
  });
  expect(result.isOk()).toBeTruthy();

  return (result.unwrap() as { profiles: ProfilesResult })?.profiles || [];
};

export const publishVideoTest = (
  provider: string,
  input: SuperfaceTestRun['input'],
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/upload-assets/${provider}`, () => {
    let superfaceUploadAssets: SuperfaceTest;
    let superfacePublishPost: SuperfaceTest;

    beforeAll(() => {
      jest.setTimeout(60000);
    });

    afterAll(() => {
      jest.setTimeout(5000);
    });

    beforeEach(() => {
      superfaceUploadAssets = new SuperfaceTest({
        profile: 'social-media/upload-assets',
        provider,
      });
      superfacePublishPost = new SuperfaceTest({
        profile: 'social-media/publish-post',
        provider,
      });
    });

    let assetId: string;

    describe('UploadAssetViaUrl', () => {
      it('should return an id', async () => {
        const profiles = await getPublishingProfiles(provider);

        const result = await superfaceUploadAssets.run(
          {
            useCase: 'UploadAssetViaUrl',
            input: {
              profileId: profiles[0].id,
              ...input,
            },
          },
          hooks
        );

        expect(result.isOk()).toBe(true);
        expect(result).toMatchSnapshot();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        assetId = (result.unwrap() as any).assetId as string;
      });
    });

    describe('GetAssetState', () => {
      test("should eventually return 'FINISHED'", () => {
        return new Promise<void>((resolve, reject) => {
          function checkForFinished() {
            superfaceUploadAssets
              .run(
                {
                  useCase: 'GetAssetState',
                  input: { assetId },
                },
                hooks
              )
              .then(result => {
                expect(result.isOk()).toBe(true);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                if ((result.unwrap() as any).state === 'Finished') {
                  resolve();
                } else {
                  setTimeout(checkForFinished, 5 * 1000);
                }
              })
              .catch(err => {
                reject(err);
              });
          }

          checkForFinished();
        });
      });
    });

    describe('Publish the Post', () => {
      test('video gets published', async () => {
        const profiles = await getPublishingProfiles(provider);

        const result = await superfacePublishPost.run(
          {
            useCase: 'PublishPost',
            input: {
              profileId: profiles[0].id,
              attachments: [{ id: assetId }],
            },
          },
          hooks
        );
        expect(result.isOk()).toBe(true);
        expect(result).toMatchSnapshot();
      });
    });
  });
};
