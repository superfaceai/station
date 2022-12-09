/* eslint-disable jest/expect-expect */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jest/no-export */
import {
  RecordingDefinitions,
  SuperfaceTest,
  TestingReturn,
} from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

type UseCaseInput = {
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
};

type UseCaseResult = {
  accessToken: string;
  refreshToken?: string;
  [key: string]: unknown;
};

const ACCESS_TOKEN_REDACTED_VALUE = 'XXX_ACCESS_TOKEN_REDACTED_XXX';
export const REFRESH_TOKEN_REDACTED_VALUE = 'XXX_REFRESH_TOKEN_REDACTED_XXX';

function generateProcessingOptions(input: UseCaseInput) {
  const refreshToken = input.refreshToken || '';
  const refreshTokenEncoded = encodeURIComponent(refreshToken);

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
      // Remove tokens in standard body response
      if (recording.response) {
        const response = recording.response as UseCaseResult;
        const modifiedProps: Record<string, string> = {};
        if (response.access_token) {
          modifiedProps.access_token = ACCESS_TOKEN_REDACTED_VALUE;
        }
        if (response.refresh_token) {
          modifiedProps.refresh_token = REFRESH_TOKEN_REDACTED_VALUE;
        }

        recording.response = { ...response, ...modifiedProps };
      }
    }
  }

  return {
    beforeRecordingSave,
    beforeRecordingLoad,
  };
}

export const refreshTokenTest = (
  provider: string,
  input: UseCaseInput,
  onRefreshPerform?: (result: UseCaseResult) => void
): void => {
  describe(`oauth2/refresh-token/${provider}`, () => {
    let superfaceRefreshToken: SuperfaceTest;
    const currentInput = { ...input };

    function expectResult(result: TestingReturn) {
      expect(result.isOk()).toBe(true);
      const resultUnwrapped = result.unwrap() as {
        accessToken: string;
        refreshToken?: string;
      };
      onRefreshPerform?.(resultUnwrapped);
      const { refreshToken, ...rest } = resultUnwrapped;
      expect(rest).toMatchSnapshot({
        accessToken: expect.any(String),
      });
      if (refreshToken) {
        currentInput.refreshToken = refreshToken;
      }
    }

    beforeEach(() => {
      superfaceRefreshToken = buildSuperfaceTest({
        profile: 'oauth2/refresh-token',
        useCase: 'GetAccessTokenFromRefreshToken',
        provider,
      });
    });

    // sanity check
    it('has all env values setup correctly', () => {
      expect(currentInput).toEqual({
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
              input: currentInput,
            },
            generateProcessingOptions(currentInput)
          );
          expectResult(result);
        });
      });

      describe('with integration parameters', () => {
        it('issues an access token', async () => {
          const { refreshToken } = currentInput;
          const result = await superfaceRefreshToken.run(
            {
              input: { refreshToken },
            },
            generateProcessingOptions(currentInput)
          );
          expectResult(result);
        });
      });
    });
  });
};
