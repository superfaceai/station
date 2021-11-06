/* eslint-disable jest/no-export */

import {
  RecordingProcessOptions,
  SuperfaceTest,
} from '@superfaceai/testing-lib';

export const textToSpeechTest = (
  provider: string,
  params: { text: string; voice: { languageCode: string } },
  hooks?: RecordingProcessOptions
): void => {
  describe(`speech/synthesis/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest();
    });

    describe('TextToSpeechSynthesis', () => {
      describe('when all inputs are correct', () => {
        it('should synthetise text to speech encoded to linear_pcm', async () => {
          const input = {
            ...params,
            audio: {
              encoding: 'linear_pcm',
            },
          };

          await expect(
            superface.run(
              {
                profile: 'speech/synthesis',
                provider,
                useCase: 'TextToSpeechSynthesis',
                input,
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });

        it('should synthetise text to speech encoded to mp3', async () => {
          const input = {
            ...params,
            audio: {
              encoding: 'mp3',
            },
          };

          await expect(
            superface.run(
              {
                profile: 'speech/synthesis',
                provider,
                useCase: 'TextToSpeechSynthesis',
                input,
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });

      describe('when inputs are invalid', () => {
        it('should throw an exception', async () => {
          const input = {
            ...params,
            audio: {
              encoding: 'linear_pcm',
              sampleRateHertz: -2,
            },
          };

          await expect(
            superface.run(
              {
                profile: 'speech/synthesis',
                provider,
                useCase: 'TextToSpeechSynthesis',
                input,
              },
              hooks
            )
          ).resolves.toMatchSnapshot();
        });
      });
    });
  });
};
