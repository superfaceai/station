import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

describe(`vcs/user-repos/bitbucket`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'vcs/user-repos',
        provider: 'bitbucket',
      },
      nockConfig
    );
  });

  describe('UserRepos', () => {
    it('should perform successfully - user with single repository', async () => {
      await expect(
        superface.run({
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
          useCase: 'UserRepos',
          input: {
            user: '!!',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
