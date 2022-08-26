import { SuperfaceTest } from '@superfaceai/testing';
import { nockConfig } from '../../../test-config';

describe(`vcs/user-repos/github`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'vcs/user-repos',
        provider: 'github',
      },
      nockConfig
    );
  });

  describe('UserRepos', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
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
          useCase: 'UserRepos',
          input: {
            user: '!!',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
