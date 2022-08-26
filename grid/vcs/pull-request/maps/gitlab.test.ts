import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

describe(`vcs/pull-request/gitlab}`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'vcs/pull-request',
        provider: 'gitlab',
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
