import { RecordingDefinitions } from '@superfaceai/testing';
import { env } from 'process';

import { publishPostTest } from './publish-post';

const ACCESS_TOKEN_REDACTED_VALUE = 'PARAMS_pageAccessToken';

const beforeRecordingSave = function (recordings: RecordingDefinitions) {
  let pageAccessToken: string | undefined;

  recordings.forEach(recording => {
    if (pageAccessToken) {
      recording.path = recording.path.replace(
        pageAccessToken,
        ACCESS_TOKEN_REDACTED_VALUE
      );
    }
    if (recording.response) {
      const response = recording.response as { access_token?: string };
      if (response.access_token) {
        pageAccessToken = response.access_token;
        recording.response = {
          ...response,
          access_token: ACCESS_TOKEN_REDACTED_VALUE,
        };
      }
    }
  });
};

const beforeRecordingLoad = function (recordings: RecordingDefinitions) {
  recordings.forEach(recording => {
    recording.path.replace(
      ACCESS_TOKEN_REDACTED_VALUE,
      env.FACEBOOK_ACCESS_TOKEN || 'xxx'
    );
  });
};

publishPostTest('facebook', {
  beforeRecordingSave,
  beforeRecordingLoad,
});
