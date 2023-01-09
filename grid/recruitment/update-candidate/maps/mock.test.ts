import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe('recruitment/update-candidate/mock', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'recruitment/update-candidate',
      provider: 'mock',
    });
  });

  describe('UpdateCandidate', () => {
    it('should perform successfully', async () => {
      const result = await superface.run({
        useCase: 'UpdateCandidate',
        input: {
          candidateId: 'CANDIDATE_ID',
          firstName: 'John',
          lastName: 'Doe',
        },
      });

      expect(() => result.unwrap()).not.toThrow();
      expect(result).toMatchSnapshot();
    });
  });
});
