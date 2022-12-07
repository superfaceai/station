/* eslint-disable jest/no-export */
import {
  RecordingProcessOptions,
  SuperfaceTest,
  SuperfaceTestRun,
} from '@superfaceai/testing';
import { nockConfig } from '../../../test-config';

type ProfilesResult = Array<{ id: string; name: string }>;

export const getPublishingProfiles = async (
  provider: string
): Promise<ProfilesResult> => {
  const superfacePublishingProfiles = new SuperfaceTest(
    {
      profile: 'social-media/publishing-profiles',
      provider,
    },
    nockConfig
  );
  const result = await superfacePublishingProfiles.run(
    {
      useCase: 'GetProfilesForPublishing',
      input: {},
    },
    { prepare: true }
  );
  expect(result.isOk()).toBeTruthy();

  return (result.unwrap() as { profiles: ProfilesResult })?.profiles || [];
};

const TIMEOUT = 120_000;

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
        jest.setTimeout(TIMEOUT);
      });

      afterAll(() => {
        jest.setTimeout(5000);
      });

      beforeEach(() => {
        superfaceUploadUrl = new SuperfaceTest(
          {
            profile: 'social-media/upload-from-url',
            provider,
          },
          nockConfig
        );
        superfacePublishPost = new SuperfaceTest(
          {
            profile: 'social-media/publish-post',
            provider,
          },
          nockConfig
        );
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

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          uploadId = (result.unwrap() as any).uploadId as string;
        });
      });

      describe('GetUploadState', () => {
        test("should eventually return 'FINISHED'", async () => {
          const now = new Date().getTime();
          let success = false;
          while (new Date().getTime() - now < TIMEOUT) {
            const result = await superfaceUploadUrl.run(
              {
                useCase: 'GetUploadState',
                input: { uploadId },
              },
              hooks
            );
            expect(() => result.unwrap()).not.toThrow();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            if ((result.unwrap() as any).state === 'finished') {
              success = true;
              break;
            }
            await new Promise(r => setTimeout(r, 5_000));
          }
          expect(success).toBe(true);
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
                videos: [uploadId],
              },
            },
            hooks
          );
          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
