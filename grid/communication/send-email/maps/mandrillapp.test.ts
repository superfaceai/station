import { sendEmailTest } from './send-email';

sendEmailTest('mandrillapp', {
  from: 'hello@demo.superface.org',
  to: 'hello@demo.superface.org',
  replyTo: 'hello+replyto@demo.superface.org',
});
