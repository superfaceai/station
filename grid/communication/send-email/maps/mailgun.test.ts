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
        if (typeof recording.body === 'string') {
          recording.body = recording.body.replace(
            /parameters-removed-to-keep-them-secure/g,
            process.env.MAILGUN_DOMAIN as string
          );
        }
      });
    },
  }
);
