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

    it('failes - Bad Request', async () => {
      await expect(
        superface.run({
          useCase: 'TranslateText',
          input: {
            targetLanguage: 'EN',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
