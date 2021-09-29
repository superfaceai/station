import { textToSpeechTest } from './text-to-speech';

textToSpeechTest('ibm-cloud-text-to-speech-eu-de', {
  text: 'Hello world!',
  voice: {
    languageCode: 'en-US',
  },
});
