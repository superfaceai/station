/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';
import * as fs from 'fs/promises';

export const speechToTextRecognitionTest = (
  provider: string,
  audioFilePath = './grid/speech/recognize/maps/hello_world_24khz.wav',
  hooks?: RecordingProcessOptions
): void => {
  describe(`speech/recognize/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest();
    });

    describe('SpeechToTextRecognition', () => {
      describe('when speech encoded in linear pcm wav', () => {
        it('should convert speech to text', async () => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const audioBase64Encoded = (
            await fs.readFile(audioFilePath)
          ).toString('base64');
          const input = {
            audioContent: audioBase64Encoded,
            languageCode: 'en-US',
          };

          await expect(
            superface.run(
              {
                profile: 'speech/recognize',
                provider,
                useCase: 'Recognize',
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
            languageCode: 'invalid-code',
            audioContent: Buffer.from('invalid audio file content').toString(
              'base64'
            ),
          };

          await expect(
            superface.run(
              {
                profile: 'speech/recognize',
                provider,
                useCase: 'Recognize',
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
