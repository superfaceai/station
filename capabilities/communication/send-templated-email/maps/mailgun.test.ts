import { sendTemplatedEmailTest } from './send-templated-email';

sendTemplatedEmailTest('mailgun', {
  from: 'hello@demo.superface.org',
  to: 'hello@superface.ai',
  domain: 'demo.superface.org',
  templateId: 'station-test',
});
