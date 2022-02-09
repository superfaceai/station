/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  REFRESH_TOKEN_REDACTED_VALUE,
  refreshTokenTest,
} from './refresh-token';

const input = {
  refreshToken: process.env.TWITTER_REFRESH_TOKEN,
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
};

refreshTokenTest('twitter', input, result => {
  if (result.refreshToken !== REFRESH_TOKEN_REDACTED_VALUE) {
    console.log('Latest Twitter refresh token:');
    console.log(`TWITTER_REFRESH_TOKEN=${result?.refreshToken}`);
  }
});
