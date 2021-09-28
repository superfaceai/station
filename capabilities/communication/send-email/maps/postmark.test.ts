import { sendEmailTest } from './send-email';

sendEmailTest('postmark', {
  from: 'hello@superface.org',
  to: 'hello@superface.ai',
});
