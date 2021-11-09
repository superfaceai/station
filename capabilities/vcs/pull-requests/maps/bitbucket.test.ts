import { SuperfaceTest } from '@superfaceai/testing';

describe(`vcs/pull-requests/bitbucket`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('PullRequests', () => {
    it('should perform successfully - only one page of PRs', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-requests',
          provider: 'bitbucket',
          useCase: 'PullRequests',
          //Repo with 1 PR, default page size is 10 - should fit on one page
          input: {
            owner: 'JakubVacek',
            repo: 'SinglePR',
          },
        })
      ).resolves.toMatchSnapshot();
    });
    it('should perform successfully - multiple pages of PRs', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-requests',
          provider: 'bitbucket',
          useCase: 'PullRequests',
          //Repo with 22 PRs, default page size is 10
          input: {
            owner: 'JakubVacek',
            repo: 'test',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
  it('should handle error', async () => {
    await expect(
      superface.run({
        profile: 'vcs/pull-requests',
        provider: 'bitbucket',
        useCase: 'PullRequests',
        input: {
          owner: 'JakubVacek',
          repo: 'made-up',
        },
      })
    ).resolves.toMatchSnapshot();
  });
});
