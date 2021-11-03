import { sendTemplatedEmailTest } from './send-templated-email';

sendTemplatedEmailTest(
  'mailgun',
  {
    from: 'demo@demo.superface.org',
    to: 'demo@superface.ai',
    templateId: 'station-test',
  },
  {
    beforeRecordingSave: recordings => {
      recordings.forEach(recording => {
        recording.path = recording.path.replace(
          process.env.MAILGUN_DOMAIN as string,
          'example.com'
        );
      });
    },
    afterRecordingLoad: scopes => {
      scopes.forEach(scope => {
        scope.filteringPath(
          new RegExp(process.env.MAILGUN_DOMAIN as string, 'g'),
          'example.com'
        );
      });
    },
  }
);
