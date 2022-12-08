/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const analyzePlainTextSentimentTests = (provider: string): void => {
  describe(`language/analyze-plain-text-sentiment/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'language/analyze-plain-text-sentiment',
        provider,
        useCase: 'AnalyzePlainTextSentiment',
      });
    });

    describe('AnalyzePlainTextSentiment', () => {
      describe('when all inputs are correct', () => {
        it('should return positive sentiment', async () => {
          const input = {
            text: 'Enjoy your stay!',
            languageCode: 'en',
          };

          await expect(
            superface.run({
              input,
            })
          ).resolves.toMatchSnapshot();
        });

        it('should return neutral sentiment', async () => {
          const input = {
            text: 'There is a book on the desk.',
            languageCode: 'en',
          };

          await expect(
            superface.run({
              input,
            })
          ).resolves.toMatchSnapshot();
        });

        it('should return negative sentiment', async () => {
          const input = {
            text: 'I feel tired this morning.',
            languageCode: 'en',
          };

          await expect(
            superface.run({
              input,
            })
          ).resolves.toMatchSnapshot();
        });
      });

      describe('when inputs are invalid', () => {
        it('should throw an exception', async () => {
          const input = {
            text: '',
            languageCode: 'wrong_language_code',
          };

          await expect(
            superface.run({
              input,
            })
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
