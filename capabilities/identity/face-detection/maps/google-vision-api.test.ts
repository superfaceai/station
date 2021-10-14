import { RecordingScopes, SuperfaceTest } from '@superfaceai/testing-lib';

describe(`identity/face-detection/google-vision-api`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('FaceDetection', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run(
          {
            profile: 'identity/face-detection',
            provider: 'google-vision-api',
            useCase: 'FaceDetection',
            input: {
              imageUrl:
                'https://upload.wikimedia.org/wikipedia/commons/c/c3/RH_Louise_Lillian_Gish.jpg',
            },
          },
          { afterRecordingLoad }
        )
      ).resolves.toMatchSnapshot();
    });
    it('should map error correctly', async () => {
      await expect(
        superface.run(
          {
            profile: 'identity/face-detection',
            provider: 'google-vision-api',
            useCase: 'FaceDetection',
            input: {
              imageUrl: 'https://upload.wikimedia.org',
            },
          },
          { afterRecordingLoad }
        )
      ).resolves.toMatchSnapshot();
    });
  });
});
//FIX: nock is trying to compare actual auth key value (loaded thru env.capabilities) and sanitized value "credentials-removed-to-keep-them-secure"
//so we are overriding actual value when we are not using live api
function afterRecordingLoad(scopes: RecordingScopes) {
  //If we are using recordings mock auth key
  if (process.env.SUPERFACE_LIVE_API === undefined)
    scopes.forEach(scope => {
      scope.filteringPath(
        /key=[^&]*/g,
        'key=credentials-removed-to-keep-them-secure'
      );
    });
}
