import { sendTemplatedEmailTest } from './send-templated-email';

sendTemplatedEmailTest('mailchimp', {
  from: 'hello@superface.org',
  to: 'hello@superface.org',
  templateId: 'station-test',

  // OneSDK doesn't support credentials in bodies (this must be replaced with actual key when running against live API)
  mailchimp_api_key: 'xxx',
});

/*
  After running test against live API, you need to:

  1. update `key` property in body and replace it with `xxx`
  2. udpate `key` property in body.template_content with `xxx`
*/
