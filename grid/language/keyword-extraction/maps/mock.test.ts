import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('language/keyword-extraction/mock', () => {
  describe('ExtractKeywords', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('language/keyword-extraction');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('ExtractKeywords');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        {
          text:
            'Artificial Intelligence (AI) is making its way into everyday developer life, but the use of AI along the API lifecycle is yet to be improved',
          languageCode: 'en',
        },
        { provider }
      );
      const data = result.unwrap() as any;
      expect(data).toEqual([
        {
          keyword: 'Artificial Intelligence',
          importance: 0.999628,
        },
        {
          keyword: 'everyday developer life',
          importance: 0.664127,
        },
        {
          keyword: 'way',
          importance: 0.632349,
        },
        {
          keyword: 'use of AI',
          importance: 0.29227,
        },
        {
          keyword: 'API lifecycle',
          importance: 0.160556,
        },
      ]);
    });
  });
});
