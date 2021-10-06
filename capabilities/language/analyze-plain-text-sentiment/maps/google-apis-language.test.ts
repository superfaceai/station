import { RecordingScopes } from '@superfaceai/testing-lib';
import { analyzePlainTextSentimentTests } from './analyze-plain-text-sentiment';

function afterRecordingLoadHook(scopes: RecordingScopes) {
  scopes.forEach(scope => {
    scope.filteringPath(
      /key=[^&]*/g,
      'key=credentials-removed-to-keep-them-secure'
    );
  });
}

analyzePlainTextSentimentTests('google-apis-language', afterRecordingLoadHook);
