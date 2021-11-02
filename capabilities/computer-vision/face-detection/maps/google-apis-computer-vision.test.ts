import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`computer-vision/face-detection/google-apis-computer-vision`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('FaceDetection', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'computer-vision/face-detection',
          provider: 'google-apis-computer-vision',
          useCase: 'FaceDetection',
          input: {
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/c/c3/RH_Louise_Lillian_Gish.jpg',
          },
        })
      ).resolves.toMatchSnapshot();
    });
    it('should map error correctly', async () => {
      await expect(
        superface.run({
          profile: 'computer-vision/face-detection',
          provider: 'google-apis-computer-vision',
          useCase: 'FaceDetection',
          input: {
            imageUrl: 'https://upload.wikimedia.org',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
