import { textToSpeechTest } from './text-to-speech';

textToSpeechTest('google-apis-text-to-speech', {
  text: 'Hello world!',
  voice: {
    languageCode: 'en-US',
  },
});
