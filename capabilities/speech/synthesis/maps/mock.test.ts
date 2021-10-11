import { SuperfaceClient } from '../../../../superface/sdk';

describe('speech/synthesis/mock', () => {
  describe('TextToSpeechSynthesis', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('speech/synthesis');
      const provider = await client.getProvider('mock');
      const usecase = profile.useCases.TextToSpeechSynthesis;

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(
        {
          audio: {
            encoding: 'mp3',
          },
          voice: {
            languageCode: 'en-US',
          },
          text: '',
        },
        { provider }
      );
      expect(result.unwrap().audioContent).toBeInstanceOf(Buffer);
    });
  });
});
