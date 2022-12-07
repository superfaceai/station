/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

export const namedEntityRecognitionTest = (provider: string): void => {
  describe(`language/named-entity-recognition/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'language/named-entity-recognition',
        provider,
      });
    });

    describe('NamedEntityRecognition', () => {
      it('extracts all entities from the phrase', async () => {
        const result = await superface.run({
          useCase: 'NamedEntityRecognition',
          input: {
            text:
              'Houston Natural Gas, run by Kenneth Lay merges with InterNorth, a natural gas company in Omaha, Nebraska, to form an interstate and intrastate natural gas pipeline with approximately 37,000 miles of pipeline.',
          },
        });
        expect(result).toMatchSnapshot();
      });

      it('extracts all entities from the phrase with language specified', async () => {
        const result = await superface.run({
          useCase: 'NamedEntityRecognition',
          input: {
            text:
              'Společnost Houston Natural Gas, kterou vede Kenneth Lay, se spojuje se společností InterNorth, plynárenskou společností v Omaze v Nebrasce, za účelem vytvoření mezistátního a vnitrostátního plynovodu na zemní plyn s přibližně 37 000 mil plynovodu.',
            languageCode: 'cs',
          },
        });
        expect(result).toMatchSnapshot();
      });

      it('fails for unsupported language', async () => {
        const result = await superface.run({
          useCase: 'NamedEntityRecognition',
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
