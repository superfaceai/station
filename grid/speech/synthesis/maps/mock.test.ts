import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('speech/synthesis/mock', () => {
  describe('TextToSpeechSynthesis', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('speech/synthesis');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('TextToSpeechSynthesis');

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
      expect((result.unwrap() as any).audioContent).toBeInstanceOf(Buffer);
    });
  });
});
