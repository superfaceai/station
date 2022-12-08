import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe(`vcs/single-file-content/gitlab`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'vcs/single-file-content',
      provider: 'gitlab',
    });
  });

  describe('SingleFileContent', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
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
