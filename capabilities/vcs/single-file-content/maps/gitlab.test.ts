import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`vcs/single-file-content/gitlab`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('SingleFileContent', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/single-file-content',
          provider: 'gitlab',
          useCase: 'SingleFileContent',
          input: {
            owner: 'Jakub-Vacek',
            repo: 'empty-test',
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
          provider: 'gitlab',
          useCase: 'SingleFileContent',
          input: {
            owner: 'Jakub-Vacek',
            repo: 'empty-test',
            path: 'README.md',
            ref: 'made-up',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
