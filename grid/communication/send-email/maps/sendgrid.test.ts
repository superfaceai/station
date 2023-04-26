import { sendEmailTest } from './send-email';

sendEmailTest('sendgrid', {
  from: 'demo@demo.superface.org',
  to: 'demo@demo.superface.org',
  replyTo: 'demo+replyto@demo.superface.org',
});
