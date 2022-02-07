/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jest/no-export */
import { SuperfaceTest } from '@superfaceai/testing';

// function beforeRecordingSave(recordings: RecordingDefinitions) {
//   let pageAccessToken: string | undefined;

//   recordings.forEach(recording => {
//     if (pageAccessToken) {
//       recording.path = recording.path.replace(
//         pageAccessToken,
//         PAGE_ACCESS_TOKEN_REDACTED_VALUE
//       );
//     }
//     if (recording.response) {
//       const response = recording.response as { access_token?: string };
//       if (response.access_token) {
//         pageAccessToken = response.access_token;
//         recording.response = {
//           ...response,
//           access_token: PAGE_ACCESS_TOKEN_REDACTED_VALUE,
//         };
//       }
//     }
//   });
// }

type UseCaseInput = {
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
};

export const refreshTokenTest = (
  provider: string,
  input: UseCaseInput
): void => {
  describe(`oauth/refresh-token/${provider}`, () => {
    let superfaceRefreshToken: SuperfaceTest;

    beforeEach(() => {
      superfaceRefreshToken = new SuperfaceTest({
        profile: 'oauth/refresh-token',
        provider,
      });
    });

    // sanity check
    it('has all env values setup correctly', () => {
      expect(input).toEqual({
        refreshToken: expect.any(String),
        clientId: expect.any(String),
        clientSecret: expect.any(String),
      });
    });

    describe('GetAccessTokenFromRefreshToken', () => {
      describe('with all parameters in input', () => {
        it('issues an access token', async () => {
          const result = await superfaceRefreshToken.run({
            useCase: 'GetAccessTokenFromRefreshToken',
            input,
          });

          expect(result.isOk()).toBeTruthy();
          expect(result.unwrap()).toMatchSnapshot();
        });
      });

      describe('with integration parameters', () => {
        it('issues an access token', async () => {
          const { refreshToken } = input;
          const result = await superfaceRefreshToken.run({
            useCase: 'GetAccessTokenFromRefreshToken',
            input: { refreshToken },
          });

          expect(result.isOk()).toBeTruthy();
          expect(result.unwrap()).toMatchSnapshot();
        });
      });
    });
  });
};
