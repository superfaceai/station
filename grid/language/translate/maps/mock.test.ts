import { SuperfaceTest } from '@superfaceai/testing';

describe('mock', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'language/translate',
      provider: 'mock',
      testInstance: expect,
    });
  });

  describe('TranslateText', () => {
    it('performs correctly', async () => {
      await expect(
        superface.run({
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
