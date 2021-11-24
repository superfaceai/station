import { textToSpeechTest } from './text-to-speech';

textToSpeechTest('ibm-cloud-text-to-speech', {
  text: 'Hello world!',
  voice: {
    languageCode: 'en-US',
  },
});
