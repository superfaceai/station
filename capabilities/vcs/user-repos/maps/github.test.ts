import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`vcs/user-repos/github`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('UserRepos', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/user-repos',
          provider: 'github',
          useCase: 'UserRepos',
          input: {
            user: 'jakub-vacek',
          },
        })
      ).resolves.toMatchSnapshot();
    });
    it('should perform successfully - user with big number of repos', async () => {
      await expect(
        superface.run({
          profile: 'vcs/user-repos',
          provider: 'github',
          useCase: 'UserRepos',
          input: {
            user: 'oclif',
          },
        })
      ).resolves.toMatchSnapshot();
    });
    it('should map error successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/user-repos',
          provider: 'github',
          useCase: 'UserRepos',
          input: {
            user: '!!',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
