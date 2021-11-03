import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`vcs/pull-requests/gitlab`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('PullRequests', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-requests',
          provider: 'gitlab',
          useCase: 'PullRequests',
          input: {
            owner: 'Jakub-Vacek',
            repo: 'empty-test',
          },
        })
      ).resolves.toMatchSnapshot();
    });
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
  }, 10000);
});
