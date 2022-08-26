import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

describe(`vcs/repository-files/github`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'vcs/repository-files',
        provider: 'github',
      },
      nockConfig
    );
  });

  describe('ListDirectory', () => {
    it('lists files without path and reference', async () => {
      await expect(
        superface.run({
          useCase: 'ListDirectory',
          input: {
            owner: 'octocat',
            repository: 'hello-world',
          },
        })
      ).resolves.toMatchSnapshot();
    });
    it('lists a single file inside entries', async () => {
      await expect(
        superface.run({
          useCase: 'ListDirectory',
          input: {
            owner: 'octocat',
            repository: 'hello-world',
            path: 'README',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('accepts a repository identifier without owner', async () => {
      const result = await superface.run({
        useCase: 'ListDirectory',
        input: {
          repository: 'octocat/hello-world',
        },
      });

      expect(result.isOk()).toBe(true);
    });

    it('accepts a git reference', async () => {
      const result = await superface.run({
        useCase: 'ListDirectory',
        input: {
          repository: 'octocat/Spoon-Knife',
          reference: 'test-branch',
        },
      });
      expect(result.isOk()).toBe(true);
      expect(result).toMatchSnapshot();
    });

    describe('errors handling', () => {
      it('fails with non-existent repository', async () => {
        const result = await superface.run({
          useCase: 'ListDirectory',
          input: {
            owner: 'superfaceai',
            repository: 'this-repo-does-not-exist',
          },
        });
        expect(result.isErr()).toBe(true);
        expect(result).toMatchSnapshot();
      });

      it('fails with non-existent reference', async () => {
        const result = await superface.run({
          useCase: 'ListDirectory',
          input: {
            owner: 'superfaceai',
            repository: 'docs',
            reference: 'this-branch-does-not-exist',
          },
        });
        expect(result.isErr()).toBe(true);
        expect(result).toMatchSnapshot();
      });
      it('fails when owner cannot be inferred from repository', async () => {
        const result = await superface.run({
          useCase: 'ListDirectory',
          input: {
            repository: 'docs',
          },
        });
        expect(result.isErr()).toBe(true);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
