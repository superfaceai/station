import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe('captcha/verify-token/mock', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'captcha/verify-token',
      provider: 'mock',
    });
  });

  describe('ValidateCaptchaResponse', () => {
    it('should perform successfully', async () => {
      const result = await superface.run({
        useCase: 'ValidateCaptchaResponse',
        input: {
          response: 'valid token',
          idempotencyKey: '123e4567-e89b-12d3-a456-426614174000',
        },
      });

      expect(() => result.unwrap()).not.toThrow();
      expect(result).toEqual({
        value: {
          challengeTimeStamp: '2022-02-28T15:14:30.096Z',
          hostname: 'example.com',
        },
      });
    });
  });
});
