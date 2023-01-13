import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe('recruitment/get-cv/mock', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'recruitment/get-cv',
      provider: 'mock',
    });
  });

  describe('GetCV', () => {
    it('should perform successfully', async () => {
      const result = await superface.run({
        useCase: 'GetCV',
        input: {
          candidateId: 'CANDIDATE_ID',
        },
      });

      expect(() => result.unwrap()).not.toThrow();
      expect(result).toMatchSnapshot();
    });
  });
});
