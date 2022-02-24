import { refreshTokenTest } from './refresh-token';

const input = {
  refreshToken: process.env.GOOGLE_APIS_REFRESH_TOKEN,
  clientId: process.env.GOOGLE_APIS_CLIENT_ID,
  clientSecret: process.env.GOOGLE_APIS_CLIENT_SECRET,
};
refreshTokenTest('google-apis', input);
