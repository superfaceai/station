import { SuperfaceTest } from '@superfaceai/testing-lib';

const superface = new SuperfaceTest();

describe('DeepL', () => {
  describe('TranslateText', () => {
    it('performs correctly', async () => {
      await expect(
        superface.run({
          profile: 'language/translate',
          provider: 'deepl',
          useCase: 'TranslateText',
          input: {
            text: 'Testovanie',
            targetLanguage: 'EN',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
