import nock from 'nock';

import { createCandidateTest } from './create-candidate';
import { createCandidateFeaturesTest } from './create-candidate-features';

createCandidateTest('breezy-hr', {
  valid: '701c3f2fc42a01',
  invalid: '12345ab789d1dd',
}, {
  beforeRecordingLoad: (recordings) => {
    recordings.forEach(recording => {
      if(recording.method === 'POST' && (/^\/v3\/company\/.+\/position\/.+\/candidate\/.+\/resume$/m.test(recording.path))) {
        const boundaryReplacement = '---boundary replaced';
        //resume upload contains multipart/form-data body with boundary with randomized value, we replace the boundary with constant in recorded body and matched body
        const recordedBody = replaceBoundaryInMultipartFormDataBody(boundaryReplacement, recording.body);
        recording.body = ( body => {
          const requestBody = replaceBoundaryInMultipartFormDataBody(boundaryReplacement, body);

          return recordedBody === requestBody;
        })
      }
    })
  }
});

createCandidateFeaturesTest('breezy-hr');

const replaceBoundaryInMultipartFormDataBody = ( (newBoundary: string, body?: nock.RequestBodyMatcher): string | undefined => {
  if (typeof(body) !== 'string') {
    return undefined;
  }
  const bodyString =  Buffer.from(body,'hex').toString();
  
  return bodyString.replace(/^(-*[0-9]+)/gm, newBoundary);
})
