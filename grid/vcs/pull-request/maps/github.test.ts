import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

describe(`vcs/pull-request/github}`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'vcs/pull-request',
        provider: 'github',
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
            owner: 'superfaceai',
            repo: 'astexplorer',
            identifier: 3,
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should map error', async () => {
      await expect(
        superface.run({
          useCase: 'PullRequest',
          input: {
            owner: 'superfaceai',
            repo: 'astexplorer',
            identifier: 9999,
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
