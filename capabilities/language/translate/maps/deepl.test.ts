import { RecordingDefinitions, SuperfaceTest } from '@superfaceai/testing-lib';

const superface = new SuperfaceTest();

const transformRecording = (recordings: RecordingDefinitions) => {
  for (const recording of recordings) {
    recording.path = recording.path.replace(
      /auth_key=.{41}/g,
      'auth_key={{credentials removed to keep them secure}}'
    );
  }
};

describe('DeepL', () => {
  describe('TranslateText', () => {
    it('performs correctly', async () => {
      await expect(
        superface.run(
          {
            profile: 'language/translate',
            provider: 'deepl',
            useCase: 'TranslateText',
            input: {
              text: 'Testovanie',
              targetLanguage: 'EN',
            },
          },
          { after: transformRecording }
        )
      ).resolves.toMatchSnapshot();
    });
  });
});
