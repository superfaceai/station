import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`vcs/pull-request/gitlab}`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('PullRequest', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-request',
          provider: 'gitlab',
          useCase: 'PullRequest',
          input: {
            owner: 'Jakub-Vacek',
            repo: 'empty-test',
            identifier: 1,
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should map error', async () => {
      await expect(
        superface.run({
          profile: 'vcs/pull-request',
          provider: 'gitlab',
          useCase: 'PullRequest',
          input: {
            owner: 'Jakub-Vacek',
            repo: 'empty-test',
            identifier: 9999,
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
