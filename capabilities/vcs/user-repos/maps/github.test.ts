import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`scope/name/provider_name}`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('UseCase', () => {
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
