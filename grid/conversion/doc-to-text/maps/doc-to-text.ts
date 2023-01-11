/* eslint-disable jest/no-export */
import { BinaryData } from '@superfaceai/one-sdk';
import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const docToTextTest = (
  provider: string,
  options?: RecordingProcessOptions
): void => {
  describe(`conversion/doc-to-text/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      jest.setTimeout(20000);
      superface = buildSuperfaceTest({
        profile: 'conversion/doc-to-text',
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
                'grid/conversion/doc-to-text/maps/test-files/empty-file.pdf'
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
                'grid/conversion/doc-to-text/maps/test-files/big-bang.pdf'
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
