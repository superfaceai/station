import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe(`vcs/user-repos/bitbucket`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'vcs/user-repos',
      provider: 'bitbucket',
    });
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
