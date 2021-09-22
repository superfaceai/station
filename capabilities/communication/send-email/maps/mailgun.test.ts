import { sendEmailTest } from './send-email';

sendEmailTest('mailgun', {
  from: 'hello@demo.superface.org',
  to: 'hello@superface.ai',
  domain: 'demo.superface.org',
});
