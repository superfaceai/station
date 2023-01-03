import { SuperfaceTest } from '@superfaceai/testing';

describe('recruitment/list-candidates/mock', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'recruitment/list-candidates',
      provider: 'mock',
    });
  });

  describe('ListCandidates', () => {
    // specify test case name
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
