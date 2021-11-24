import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('language/analyze-sentiment/mock', () => {
  describe('AnalyzePlainTextSentiment', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile(
        'language/analyze-plain-text-sentiment'
      );
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('AnalyzePlainTextSentiment');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        {
          text: 'Enjoy your stay!',
          languageCode: 'en',
        },
        { provider }
      );
      const data = result.unwrap() as any;
      expect(data.sentiment).toBe('positive');
      expect(data.score).toBe(0.9);
    });
  });
});
