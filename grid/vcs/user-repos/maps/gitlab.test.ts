import { SuperfaceTest } from '@superfaceai/testing';

describe(`vcs/user-repos/gitlab`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'vcs/user-repos',
      provider: 'gitlab',
      testInstance: expect,
    });
  });

  describe('UserRepos', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'UserRepos',
          input: {
            user: 'zdne',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should perform successfully - user with multiple repos', async () => {
      await expect(
        superface.run({
          useCase: 'UserRepos',
          input: {
            user: 'Jakub-Vacek',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should map eror successfully', async () => {
      await expect(
        superface.run({
          useCase: 'UserRepos',
          input: {
            user: 'madeup',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
