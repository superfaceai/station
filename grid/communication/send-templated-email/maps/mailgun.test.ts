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
