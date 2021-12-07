import { env } from 'process';

import { publishPostTest } from './publish-post';

publishPostTest('facebook', {
  accessToken: env.FACEBOOK_TOKEN ?? 'xxx',
  pageId: env.FACEBOOK_PAGE_ID ?? 'xxx',
});

publishPostTest('facebook', {
  accessToken: env.FACEBOOK_TOKEN ?? 'xxx',
  groupId: env.FACEBOOK_GROUP_ID ?? 'xxx',
});
