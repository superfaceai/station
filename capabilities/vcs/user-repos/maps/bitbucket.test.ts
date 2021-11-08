import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`vcs/user-repos/bitbucket`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('UserRepos', () => {
    it('should perform successfully - user with single repository', async () => {
      await expect(
        superface.run({
          profile: 'vcs/user-repos',
          provider: 'bitbucket',
          useCase: 'UserRepos',
          input: {
            user: 'jakuvacek',
          },
        })
      ).resolves.toMatchSnapshot();
    });
    it('should perform successfully - user with mutiple repositories', async () => {
      await expect(
        superface.run({
          profile: 'vcs/user-repos',
          provider: 'bitbucket',
          useCase: 'UserRepos',
          input: {
            user: 'JakubVacek',
          },
        })
      ).resolves.toMatchSnapshot();
    });
    it('should map error successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/user-repos',
          provider: 'bitbucket',
          useCase: 'UserRepos',
          input: {
            user: '!!',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
