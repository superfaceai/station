import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe('recruitment/create-requisition/mock', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'recruitment/create-requisition',
      provider: 'mock',
    });
  });

  describe('CreateRequisition', () => {
    // specify test case name
    it('should perform successfully', async () => {
      const result = await superface.run({
        useCase: 'CreateRequisition',
        input: {
          requisitionCode: 'REQ-5',
          name: 'Software Developer, Platform',
          headcountTotal: 2,
          status: 'Open',
          location: 'Prague',
        },
      });

      expect(() => result.unwrap()).not.toThrow();
      expect(result).toMatchSnapshot();
    });
  });
});
