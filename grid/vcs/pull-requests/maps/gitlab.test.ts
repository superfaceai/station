import { SuperfaceTest } from '@superfaceai/testing';

describe(`vcs/pull-requests/gitlab`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('PullRequests', () => {
    it('should perform successfully - only one page of PRs', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-requests',
          provider: 'gitlab',
          useCase: 'PullRequests',
          //Repo with 1 PR, default gitlab page size is 20
          input: {
            owner: 'Jakub-Vacek',
            repo: 'single-pr',
          },
        })
      ).resolves.toMatchSnapshot();
    });
    it('should perform successfully - multiple pages of PRs', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-requests',
          provider: 'gitlab',
          useCase: 'PullRequests',
          //Repo with 21 PRs, default gitlab page size is 20
          input: {
            owner: 'Jakub-Vacek',
            repo: 'prs-test',
          },
        })
      ).resolves.toMatchSnapshot();
    });
    it('should handle error', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-requests',
          provider: 'gitlab',
          useCase: 'PullRequests',
          input: {
            owner: 'Jakub-Vacek',
            repo: 'made-up',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
