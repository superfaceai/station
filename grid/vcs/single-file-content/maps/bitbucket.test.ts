import { SuperfaceTest } from '@superfaceai/testing';
import { nockConfig } from '../../../test-config';

describe(`vcs/single-file-content/bitbucket`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'vcs/single-file-content',
        provider: 'bitbucket',
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
