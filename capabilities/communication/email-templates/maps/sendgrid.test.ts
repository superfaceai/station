import { RecordingDefinitions } from '@superfaceai/testing-lib';

import { emailTemplatestTest } from './email-templates';

emailTemplatestTest(
  'sendgrid',
  { id: 'd-ef6d417300f74f96a9f722050edae85f' },
  {
    beforeRecordingSave: (recordings: RecordingDefinitions) => {
      recordings.forEach(recording => {
        if (recording.path.includes('/versions')) {
          // we have random value in request body which sould result in not matching the request
          recording.body = undefined;
        }
      });
    },
  }
);
