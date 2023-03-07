import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe('DeepL', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'language/translate',
      provider: 'deepl',
    });
  });

  describe('TranslateText', () => {
    it('performs correctly', async () => {
      const result = await superface.run({
        useCase: 'TranslateText',
        input: {
          text: 'Hello, world!',
          sourceLanguage: 'EN',
          targetLanguage: 'DE',
        },
      });
      expect(result.isOk()).toBe(true);
      expect(result).toMatchSnapshot();
    });

    it('fails with Bad Request', async () => {
      const result = await superface.run({
        useCase: 'TranslateText',
        input: {
          targetLanguage: 'DE',
        },
      });
      expect(result.isErr()).toBe(true);
      expect(result).toMatchSnapshot();
    });
  });
});
