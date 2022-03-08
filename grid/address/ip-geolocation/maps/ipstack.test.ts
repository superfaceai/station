import { RecordingDefinitions } from '@superfaceai/testing';

import { ipGeolocationTest } from './ip-geocoding';

const IPSTACK_API_KEY_REDACTED_VALUE = 'IPSTACK_API_KEY_REDACTED';

ipGeolocationTest('ipstack', {
  //Testing library is not processing recordings because integration parameter is used to replace HTTP scheme which is not supported by testing lib
  processRecordings: false,
  beforeRecordingSave: (recordings: RecordingDefinitions) => {
    for (const recording of recordings) {
      if (process.env['IPSTACK_API_KEY']) {
        recording.path = recording.path.replace(
          process.env['IPSTACK_API_KEY'],
          IPSTACK_API_KEY_REDACTED_VALUE
        );
      }
    }
  },
  beforeRecordingLoad: (recordings: RecordingDefinitions) => {
    for (const recording of recordings) {
      if (process.env['IPSTACK_API_KEY']) {
        recording.path = recording.path.replace(
          IPSTACK_API_KEY_REDACTED_VALUE,
          process.env['IPSTACK_API_KEY']
        );
      }
    }
  },
});
