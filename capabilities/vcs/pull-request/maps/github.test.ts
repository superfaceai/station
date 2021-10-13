import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`vcs/pull-request/github}`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('PullRequest', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-request',
          provider: 'github',
          useCase: 'PullRequest',
          input: {
            owner: 'superfaceai',
            repo: 'astexplorer',
            identifier: 3,
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should map error', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-request',
          provider: 'github',
          useCase: 'PullRequest',
          input: {
            owner: 'superfaceai',
            repo: 'astexplorer',
            identifier: 9999,
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
