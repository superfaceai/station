import { sendEmailTest } from './send-email';

sendEmailTest('postmark', {
  from: 'demo@demo.superface.org',
  to: 'demo@demo.superface.org',
  replyTo: 'demo+replyto@demo.superface.org',
});
