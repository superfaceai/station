import { sendEmailTest } from './send-email';

sendEmailTest('mailchimp', {
  from: 'hello@superface.org',
  to: 'hello@superface.org',

  // OneSDK doesn't support credentials in bodies (this must be replaced with actual key when running against live API)
  mailchimp_api_key: 'xxx',
});

/*
  After running test against live API, you need to:

  1. update `key` property in body and replace it with `xxx`
*/
