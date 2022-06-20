import { sendTemplatedEmailTest } from './send-templated-email';

sendTemplatedEmailTest('mandrillapp', {
  from: 'hello@superface.org',
  to: 'hello@superface.org',
  templateId: 'station-test',
});
