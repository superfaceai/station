import { sendTemplatedEmailTest } from './send-templated-email';

sendTemplatedEmailTest('postmark', {
  from: 'hello@superface.ai',
  to: 'hello@superface.ai',
  templateId: '23783943',
});
