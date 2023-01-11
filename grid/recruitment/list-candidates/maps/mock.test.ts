import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe('recruitment/list-candidates/mock', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'recruitment/list-candidates',
      provider: 'mock',
    });
  });

  describe('ListCandidates', () => {
    it('should perform successfully', async () => {
      const result = await superface.run({
        useCase: 'ListCandidates',
        input: {
          jobId: 'JOB_ID',
        },
      });

      expect(() => result.unwrap()).not.toThrow();
      expect(result).toMatchSnapshot();
    });
  });
});
