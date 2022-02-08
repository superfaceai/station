/* eslint-disable jest/expect-expect */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jest/no-export */
import {
  RecordingDefinitions,
  SuperfaceTest,
  TestingReturn,
} from '@superfaceai/testing';

type UseCaseInput = {
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
};

const ACCESS_TOKEN_REDACTED_VALUE = 'XXX_ACCESS_TOKEN_REDACTED_XXX';
const REFRESH_TOKEN_REDACTED_VALUE = 'XXX_REFRESH_TOKEN_REDACTED_XXX';

function generateProcessingOptions(input: UseCaseInput) {
  const refreshToken = input.refreshToken || '';
  const refreshTokenEncoded = encodeURIComponent(refreshToken);

  function beforeRecordingSave(recordings: RecordingDefinitions) {
    for (const recording of recordings) {
      if (refreshToken && typeof recording.body === 'string') {
        recording.body = recording.body.replace(
          refreshToken,
          REFRESH_TOKEN_REDACTED_VALUE
        );
        recording.body = recording.body.replace(
          refreshTokenEncoded,
          REFRESH_TOKEN_REDACTED_VALUE
        );
      }
      // Remove access_token in standard body response
      if (recording.response) {
        const response = recording.response as { access_token?: string };
        if (response.access_token) {
          recording.response = {
            ...response,
            access_token: ACCESS_TOKEN_REDACTED_VALUE,
          };
        }
      }
    }
  }

  function beforeRecordingLoad(recordings: RecordingDefinitions) {
    for (const recording of recordings) {
      if (refreshToken && typeof recording.body === 'string') {
        recording.body = recording.body.replace(
          REFRESH_TOKEN_REDACTED_VALUE,
          refreshToken
        );
      }
    }
  }

  return {
    beforeRecordingSave,
    beforeRecordingLoad,
  };
}

function expectResult(result: TestingReturn) {
  expect(result.isOk()).toBe(true);
  const { accessToken, ...rest } = result.unwrap() as {
    accessToken: string;
  };
  expect(accessToken).toEqual(expect.any(String));
  expect(rest).toMatchSnapshot();
}

export const refreshTokenTest = (
  provider: string,
  input: UseCaseInput
): void => {
  describe(`oauth/refresh-token/${provider}`, () => {
    let superfaceRefreshToken: SuperfaceTest;
    const processingOptions = generateProcessingOptions(input);

    beforeEach(() => {
      superfaceRefreshToken = new SuperfaceTest({
        profile: 'oauth/refresh-token',
        provider,
        testInstance: expect,
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
          const result = await superfaceRefreshToken.run(
            {
              useCase: 'GetAccessTokenFromRefreshToken',
              input,
            },
            processingOptions
          );
          expectResult(result);
        });
      });

      describe('with integration parameters', () => {
        it('issues an access token', async () => {
          const { refreshToken } = input;
          const result = await superfaceRefreshToken.run(
            {
              useCase: 'GetAccessTokenFromRefreshToken',
              input: { refreshToken },
            },
            processingOptions
          );
          expectResult(result);
        });
      });
    });
  });
};
