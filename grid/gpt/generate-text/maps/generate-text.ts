/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

export const generateTextTest = (provider: string): void => {
  describe(`gpt/generate-text/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'gpt/generate-text',
        provider,
      });
    });

    describe('CompleteText', () => {
      it('completes text based on the prompt (using defaults)', async () => {
        const result = await superface.run({
          useCase: 'CompleteText',
          input: {
            prompt: 'Say this is a test',
          },
        });
        expect(result).toMatchSnapshot();
      });

      it('completes text based on the prompt (using specific params)', async () => {
        const result = await superface.run({
          useCase: 'CompleteText',
          input: {
            prompt: 'Write a tagline for an ice cream shop.',
            creativity: 0.8,
            approxMaxWords: 30,
            count: 3,
            model: 'large',
          },
        });
        expect(result).toMatchSnapshot();
      });

      it('errors with negative max word limit', async () => {
        const result = await superface.run({
          useCase: 'CompleteText',
          input: {
            prompt: 'Say this is a test',
            approxMaxWords: -30,
          },
        });
        expect(result).toMatchSnapshot();
      });
    });
  });
};
