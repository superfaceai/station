import { SuperfaceTest } from '@superfaceai/testing';

describe(`vcs/repository-files/mock`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'vcs/repository-files',
      provider: 'mock',
    });
  });

  describe('ListDirectory', () => {
    it('works', async () => {
      const result = await superface.run({
        useCase: 'ListDirectory',
        input: {
          owner: 'octocat',
          repository: 'hello-world',
        },
      });

      expect(result.isOk()).toBe(true);
    });
  });
});
