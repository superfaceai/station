import { RequestBodyMatcher } from 'nock/types';

import { replaceBoundaryInMultipartFormDataBody } from './replace_boundary';

type RecordingMatcher = (recording: {
  path: string;
  method?: string | undefined;
}) => boolean;

export const multipartFormDataBoundaryMatcherHook = (
  recordingMatcher: RecordingMatcher
) => {
  return (
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
        if (recordingMatcher(recording)) {
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
  };
};
