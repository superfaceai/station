/* eslint-disable jest/no-export */
import { BinaryData } from '@superfaceai/one-sdk';
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';
import { resolve } from 'path';

import { buildSuperfaceTest } from '../../../test-config';

export const docToTextTest = (
  provider: string,
  options?: RecordingProcessOptions
): void => {
  describe(`file-conversion/doc-to-text/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      jest.setTimeout(20000);
      superface = buildSuperfaceTest({
        profile: 'file-conversion/doc-to-text',
        provider,
      });
    });

    describe('ConvertDocumentToText', () => {
      it('should return error when converting empty file', async () => {
        const result = await superface.run(
          {
            useCase: 'ConvertDocumentToText',
            input: {
              fileName: 'empty-file.pdf',
              content: BinaryData.fromPath(
                resolve(__dirname, 'test-files/empty-file.pdf')
              ),
            },
          },
          options
        );

        expect(() => result.unwrap()).toThrow();
        expect(result).toMatchSnapshot();
      });

      it('should perform successfully', async () => {
        const result = await superface.run(
          {
            useCase: 'ConvertDocumentToText',
            input: {
              fileName: 'big-bang.pdf',
              content: BinaryData.fromPath(
                resolve(__dirname, 'test-files/big-bang.pdf')
              ),
            },
          },
          options
        );

        expect(() => result.unwrap()).not.toThrow();
        expect(result).toMatchSnapshot();
      });
    });
  });
};
