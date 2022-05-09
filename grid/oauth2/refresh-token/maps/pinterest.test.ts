import { refreshTokenTest } from './refresh-token';

const input = {
  refreshToken: process.env.PINTEREST_REFRESH_TOKEN,
  clientId: process.env.PINTEREST_APP_ID,
  clientSecret: process.env.PINTEREST_APP_SECRET,
};
refreshTokenTest('pinterest', input);
