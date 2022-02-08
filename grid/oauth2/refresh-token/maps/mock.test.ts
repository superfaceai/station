import { refreshTokenTest } from './refresh-token';

const input = {
  refreshToken: 'foobar',
  clientId: 'clientId',
  clientSecret: 'clientSecret',
};
refreshTokenTest('mock', input);
