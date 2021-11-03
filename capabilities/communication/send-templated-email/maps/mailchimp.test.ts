import { sendTemplatedEmailTest } from './send-templated-email';

sendTemplatedEmailTest('mailchimp', {
  from: 'hello@superface.org',
  to: 'hello@superface.org',
  templateId: 'station-test',
});
