import { RequestBodyMatcher } from 'nock/types';

import { replaceBoundaryInMultipartFormDataBody } from '../../../../test/helpers/replace_boundary';
import { docToTextTest } from './doc-to-text';

docToTextTest('cloudmersive', {
  beforeRecordingLoad: (
    recordings: {
      path: string;
      method?: string | undefined;
      body?: RequestBodyMatcher | undefined;
    }[]
  ) => {
    recordings.forEach(
      (recording: {
        path: string;
        method?: string | undefined;
        body?: RequestBodyMatcher | undefined;
      }) => {
        if (
          recording.method === 'POST' &&
          recording.path === '/convert/autodetect/to/txt'
        ) {
          const boundaryReplacement = '---boundary replaced';
          //Boundary contains random value, we are replacing it with constant to match the recording
          const recordedBody = replaceBoundaryInMultipartFormDataBody(
            boundaryReplacement,
            recording.body
          );
          recording.body = (body: RequestBodyMatcher | undefined) => {
            const requestBody = replaceBoundaryInMultipartFormDataBody(
              boundaryReplacement,
              body
            );

            return recordedBody === requestBody;
          };
        }
      }
    );
  },
});
