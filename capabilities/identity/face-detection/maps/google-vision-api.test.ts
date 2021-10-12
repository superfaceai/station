import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`identity/face-detection/google-vision-api`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('FaceDetection', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'identity/face-detection',
          provider: 'google-vision-api',
          useCase: 'FaceDetection',
          input: {
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/c/c3/RH_Louise_Lillian_Gish.jpg',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
