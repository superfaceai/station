import { RecordingScopes } from '@superfaceai/testing-lib';

import { textToSpeechTest } from './text-to-speech';

function afterRecordingLoadHook(scopes: RecordingScopes) {
  scopes.forEach(scope => {
    scope.filteringPath(
      /key=[^&]*/g,
      'key=credentials-removed-to-keep-them-secure'
    );
  });
}

textToSpeechTest(
  'google-apis-text-to-speech',
  {
    text: 'Hello world!',
    voice: {
      languageCode: 'en-US',
    },
  },
  {
    afterRecordingLoad: afterRecordingLoadHook,
  }
);
