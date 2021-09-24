import { sendTemplatedEmailTest } from './send-templated-email';

sendTemplatedEmailTest('sendgrid', {
  from: 'hello@superface.ai',
  to: 'hello@superface.ai',
  templateId: 'd-0b2a1c572233468ba4b35737d7a004ba',
});
