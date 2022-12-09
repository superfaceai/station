/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const generateTextTest = (provider: string): void => {
  describe(`gpt/generate-text/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
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

    describe('EditText', () => {
      it('edits the text based on the input & instructions (using defaults)', async () => {
        const result = await superface.run({
          useCase: 'EditText',
          input: {
            text: 'What day of the wek is it?',
            instructions: 'Fix the spelling mistakes',
          },
        });
        expect(result).toMatchSnapshot();
      });

      it('edits the text based on the input & instructions (using specific params)', async () => {
        const result = await superface.run({
          useCase: 'EditText',
          input: {
            text: 'What day of the wek is it?',
            instructions: 'Fix the spelling mistakes',
            creativity: 0.2,
            count: 2,
          },
        });
        expect(result).toMatchSnapshot();
      });

      it('errors with large request edits count', async () => {
        const result = await superface.run({
          useCase: 'EditText',
          input: {
            text: 'What day of the wek is it?',
            instructions: 'Fix the spelling mistakes',
            count: 1000,
          },
        });
        expect(result).toMatchSnapshot();
      });
    });
  });
};
