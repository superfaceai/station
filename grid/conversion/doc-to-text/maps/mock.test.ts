import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe('conversion/doc-to-text/mock', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'conversion/doc-to-text',
      provider: 'mock',
    });
  });

  describe('DocToText', () => {
    // specify test case name
    it('should perform successfully', async () => {
      const result = await superface.run({
        useCase: 'ConvertDocumentToText',
        input: {
          fileName: 'big-bang.pdf',
          content: '<BinaryData>',
        },
      });

      expect(() => result.unwrap()).not.toThrow();
      expect(result).toMatchSnapshot();
    });
  });
});
