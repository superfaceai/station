import { SuperfaceTest } from '@superfaceai/testing';

describe(`vcs/single-file-content/bitbucket`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('SingleFileContent', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/single-file-content',
          provider: 'bitbucket',
          useCase: 'SingleFileContent',
          input: {
            owner: 'jakuvacek',
            repo: 'testrepository',
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
          provider: 'bitbucket',
          useCase: 'SingleFileContent',
          input: {
            owner: 'jakuvacek',
            repo: 'testrepository',
            path: 'README.md',
            ref: 'made-up',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
