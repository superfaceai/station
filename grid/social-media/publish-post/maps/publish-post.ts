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

type InputTestCase = {
  name: string;
  input: SuperfaceTestRun['input'];
  success?: boolean;
};

export const publishInputCasesTest = (
  provider: string,
  cases: InputTestCase[],
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
      superfacePublisPost = new SuperfaceTest({
        profile: 'social-media/publish-post',
        provider,
      });
    });

    const testCases = cases.map(
      ({ name, input, success = true }) => [name, input, success] as const
    );

    describe('PublishPost', () => {
      describe('media custom input', () => {
        // FIXME: Use $name in Jest 27+
        test.each(testCases)('%s', async (_name, input, success) => {
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
          expect(result.isOk()).toBe(success);
          expect(result).toMatchSnapshot();
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
