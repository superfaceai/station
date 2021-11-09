import { sendTemplatedEmailTest } from './send-templated-email';

sendTemplatedEmailTest('postmark', {
  from: 'demo@demo.superface.org',
  to: 'demo@demo.superface.org',
  templateId: '25760152',
});
