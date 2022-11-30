/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

export const keywordExtractionTest = (provider: string): void => {
  describe(`language/keyword-extraction/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'language/keyword-extraction',
        provider,
      });
    });

    describe('ExtractKeywords', () => {
      it('extracts all keywords from the phrase', async () => {
        const result = await superface.run({
          useCase: 'ExtractKeywords',
          input: {
            text:
              'Artificial Intelligence (AI) is making its way into everyday developer life, but the use of AI along the API lifecycle is yet to be improved',
          },
        });
        expect(result).toMatchSnapshot();
      });

      it('extracts all keywords from the phrase with language specified', async () => {
        const result = await superface.run({
          useCase: 'ExtractKeywords',
          input: {
            text: 'Je moje auto uzamčeno?',
            languageCode: 'cs',
          },
        });
        expect(result).toMatchSnapshot();
      });

      it('fails for unsupported language', async () => {
        const result = await superface.run({
          useCase: 'ExtractKeywords',
          input: {
            text: 'iuzvahejnfuzubaáýzhj',
            languageCode: 'nonsense',
          },
        });
        expect(result).toMatchSnapshot();
      });
    });
  });
};
