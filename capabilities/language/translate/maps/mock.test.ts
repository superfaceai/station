import { SuperfaceTest } from '@superfaceai/testing-lib';

const superface = new SuperfaceTest();

describe('mock', () => {
  describe('TranslateText', () => {
    it('performs correctly', async () => {
      await expect(
        superface.run(
          {
            profile: 'language/translate',
            provider: 'mock',
            useCase: 'TranslateText',
            input: {
              text: '',
              targetLanguage: '',
            },
          },
        )
      ).resolves.toMatchSnapshot();
    });
  });
});
