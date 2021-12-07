import { env } from 'process';

import { publishPostTest } from './publish-post';

publishPostTest('instagram', {
  accessToken: env.INSTAGRAM_TOKEN ?? 'xxx',
  businessAccountId: env.INSTAGRAM_IG_USER_ID ?? 'xxx',
});
