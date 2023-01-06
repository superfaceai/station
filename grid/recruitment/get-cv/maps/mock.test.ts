import { SuperfaceTest } from '@superfaceai/testing';

describe('recruitment/get-cv/mock', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'recruitment/get-cv',
      provider: 'mock',
    });
  });

  describe('GetCV', () => {
    it('should perform successfully', async () => {
      const result = await superface.run({
        useCase: 'GetCV',
        input: {
          candidateId: 'CANDIATE_ID',
        },
      });

      expect(() => result.unwrap()).not.toThrow();
      expect(result).toMatchSnapshot();
    });
  });
});
