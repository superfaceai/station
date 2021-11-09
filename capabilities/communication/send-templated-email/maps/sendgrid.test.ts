import { sendTemplatedEmailTest } from './send-templated-email';

sendTemplatedEmailTest('sendgrid', {
  from: 'demo@demo.superface.org',
  to: 'demo@demo.superface.org',
  templateId: 'd-ef6d417300f74f96a9f722050edae85f',
});
