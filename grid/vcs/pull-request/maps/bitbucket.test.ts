import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

describe(`vcs/pull-request/bitbucket}`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'vcs/pull-request',
        provider: 'bitbucket',
      },
      nockConfig
    );
  });

  describe('PullRequest', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'PullRequest',
          input: {
            owner: 'jakuvacek',
            repo: 'testrepository',
            identifier: 1,
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should map error', async () => {
      await expect(
        superface.run({
          useCase: 'PullRequest',
          input: {
            owner: 'jakuvacek',
            repo: 'testrepository',
            identifier: 999,
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
