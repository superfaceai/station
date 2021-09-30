import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`vcs/pull-requests/bitbucket}`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('PullRequests', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-requests',
          provider: 'bitbucket',
          useCase: 'PullRequests',
          input: {
            owner: 'JakubVacek',
            repo: 'test'
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
  //FIX: this does not finish in 10 seconds, something borked in testing lib/sdk?
  it('should handle error', async () => {
    await expect(
      superface.run({
        profile: 'vcs/pull-requests',
        provider: 'bitbucket',
        useCase: 'PullRequests',
        input: {
          owner: 'JakubVacek',
          repo: 'made-up'
        },
      })
    ).resolves.toMatchSnapshot();
  }, 10000);
});
