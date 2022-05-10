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

export const publishPostTest = (
  provider: string,
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/publish-post/${provider}`, () => {
    let superfacePublishingProfiles: SuperfaceTest;
    let superfacePublisPost: SuperfaceTest;

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
      describe('when publishing text post', () => {
        it('should succeed', async () => {
          const result = await superfacePublishingProfiles.run({
            useCase: 'GetProfilesForPublishing',
            input: {},
          });

          expect(result.isOk()).toBeTruthy();
          const resultUnwrapped = result.unwrap();

          await expect(
            superfacePublisPost.run(
              {
                useCase: 'PublishPost',
                input: {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                  profileId: (resultUnwrapped as any).profiles[0].id,
                  text: `Test from Superface Station 7.`,
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

type ErrorCase = {
  name: string;
  input: SuperfaceTestRun['input'];
};

export const publishPostErrorTest = (
  provider: string,
  cases: ErrorCase[],
  hooks?: RecordingProcessOptions
): void => {
  describe(`social-media/publish-post/${provider}`, () => {
    let superfacePublisPost: SuperfaceTest;

    beforeEach(() => {
      superfacePublisPost = new SuperfaceTest({
        profile: 'social-media/publish-post',
        provider,
      });
    });

    const testCases: Array<
      [string, ErrorCase['input']]
    > = cases.map(({ name, input }) => [name, input]);

    describe('PublishPost', () => {
      describe('error cases', () => {
        // FIXME: Use $name in Jest 27+
        test.each(testCases)('%s', async (_name, input) => {
          const result = await superfacePublisPost.run(
            {
              useCase: 'PublishPost',
              input,
            },
            hooks
          );
          expect(result.isErr()).toBe(true);
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
