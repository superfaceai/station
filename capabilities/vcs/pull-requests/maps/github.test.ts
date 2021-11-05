import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`vcs/pull-requests/github`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('PullRequests', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-requests',
          provider: 'github',
          useCase: 'PullRequests',
          input: {
            owner: 'DXHeroes',
            repo: 'pipeliner',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
  it('should handle error', async () => {
    await expect(
      superface.run({
        profile: 'vcs/pull-requests',
        provider: 'github',
        useCase: 'PullRequests',
        input: {
          owner: 'DXHeroes',
          repo: 'made-up',
        },
      })
    ).resolves.toMatchSnapshot();
  });
});
