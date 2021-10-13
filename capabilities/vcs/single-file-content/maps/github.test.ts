import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`vcs/single-file-content/github`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('SingleFileContent', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/single-file-content',
          provider: 'github',
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
          profile: 'vcs/single-file-content',
          provider: 'github',
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
