/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const verifyTokenTest = (provider: string, validResponse: string) => {
  describe(`captcha/verify-token/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'captcha/verify-token',
        provider,
      });
    });

    describe('ValidateCaptchaResponse', () => {
      it('should map error', async () => {
        const result = await superface.run({
          useCase: 'ValidateCaptchaResponse',
          input: {
            response: 'invalid response',
            idempotencyKey: '123e4567-e89b-12d3-a456-426614174000',
          },
        });

        expect(() => result.unwrap()).toThrow();
        expect(result).toMatchSnapshot();
      });

      it('should perform successfully', async () => {
        const result = await superface.run({
          useCase: 'ValidateCaptchaResponse',
          input: {
            response: validResponse,
            idempotencyKey: '123e4567-e89b-12d3-a456-426614174000',
          },
        });

        console.debug(result);

        expect(() => result.unwrap()).not.toThrow();
        expect(result).toMatchSnapshot();
      });
    });
  });
};
