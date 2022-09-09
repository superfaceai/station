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
  name: string,
  input: SuperfaceTestRun['input'],
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/upload-from-url/${provider}`, () => {
    describe(`${name}`, () => {
      let superfaceUploadUrl: SuperfaceTest;
      let superfacePublishPost: SuperfaceTest;

      beforeAll(() => {
        jest.setTimeout(60000);
      });

      afterAll(() => {
        jest.setTimeout(5000);
      });

      beforeEach(() => {
        superfaceUploadUrl = new SuperfaceTest({
          profile: 'social-media/upload-from-url',
          provider,
        });
        superfacePublishPost = new SuperfaceTest({
          profile: 'social-media/publish-post',
          provider,
        });
      });

      let uploadId: string;

      describe('RegisterUpload', () => {
        it('should return an id', async () => {
          const profiles = await getPublishingProfiles(provider);

          const result = await superfaceUploadUrl.run(
            {
              useCase: 'RegisterUpload',
              input: {
                profileId: profiles[0].id,
                ...input,
              },
            },
            hooks
          );

          expect(result.isOk()).toBe(true);
          expect(result).toMatchSnapshot();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          uploadId = (result.unwrap() as any).uploadId as string;
        });
      });

      describe('GetUploadState', () => {
        test("should eventually return 'FINISHED'", () => {
          return new Promise<void>((resolve, reject) => {
            function checkForFinished() {
              superfaceUploadUrl
                .run(
                  {
                    useCase: 'GetUploadState',
                    input: { uploadId },
                  },
                  hooks
                )
                .then(result => {
                  expect(result.isOk()).toBe(true);
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                  if ((result.unwrap() as any).state === 'finished') {
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
                attachments: [{ id: uploadId }],
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
