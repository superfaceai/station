import { sendTemplatedEmailTest } from './send-templated-email';

sendTemplatedEmailTest('mailgun', {
  from: 'demo@demo.superface.org',
  to: 'demo@superface.ai',
  templateId: 'station-test',
});
