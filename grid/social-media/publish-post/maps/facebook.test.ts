import { RecordingDefinitions } from '@superfaceai/testing';

import { publishPostTest } from './publish-post';

const PAGE_ACCESS_TOKEN_REDACTED_VALUE = 'PAGE_ACCESS_TOKEN_VALUE_REDACTED';

const beforeRecordingSave = function (recordings: RecordingDefinitions) {
  let pageAccessToken: string | undefined;

  recordings.forEach(recording => {
    if (pageAccessToken) {
      recording.path = recording.path.replace(
        pageAccessToken,
        PAGE_ACCESS_TOKEN_REDACTED_VALUE
      );
    }
    if (recording.response) {
      const response = recording.response as { access_token?: string };
      if (response.access_token) {
        pageAccessToken = response.access_token;
        recording.response = {
          ...response,
          access_token: PAGE_ACCESS_TOKEN_REDACTED_VALUE,
        };
      }
    }
  });
};

publishPostTest('facebook', {
  beforeRecordingSave,
});
