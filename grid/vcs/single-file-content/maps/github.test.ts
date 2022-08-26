import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

describe(`vcs/single-file-content/github`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'vcs/single-file-content',
        provider: 'github',
      },
      nockConfig
    );
  });

  describe('SingleFileContent', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'SingleFileContent',
          input: {
            owner: 'superfaceai',
            repo: 'astexplorer',
            path: 'README.md',
            ref: 'master',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should map error', async () => {
      await expect(
        superface.run({
          useCase: 'SingleFileContent',
          input: {
            owner: 'superfaceai',
            repo: 'astexplorer',
            path: 'README.md',
            ref: 'made-up',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
