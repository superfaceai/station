import { sendEmailTest } from './send-email';

sendEmailTest(
  'mailgun',
  {
    from: 'demo@demo.superface.org',
    to: 'demo@superface.ai',
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
