import { SuperfaceTest } from '@superfaceai/testing';

describe(`vcs/pull-requests/github`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('PullRequests', () => {
    it('should perform successfully - only one page of PRs', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-requests',
          provider: 'github',
          useCase: 'PullRequests',
          //Repo with 1 PR, default page size is 30 - should fit on one page
          input: {
            owner: 'Jakub-Vacek',
            repo: 'BcAppServer',
          },
        })
      ).resolves.toMatchSnapshot();
    });
    it('should perform successfully - two pages of PRs', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-requests',
          provider: 'github',
          useCase: 'PullRequests',
          //Repo with 32 PRs, default page size is 30 - should fit on two pages
          input: {
            owner: 'Jakub-Vacek',
            repo: 'JenkinsTest',
          },
        })
      ).resolves.toMatchSnapshot();
    });
    it('should handle error', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-requests',
          provider: 'github',
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
