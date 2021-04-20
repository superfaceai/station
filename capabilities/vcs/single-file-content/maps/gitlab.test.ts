import { ok, SuperfaceClient } from '@superfaceai/sdk';

describe('vcs/single-file-content/gitlab', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/single-file-content');
    const useCase = profile.getUseCase('singleFileContent');
    const provider = await client.getProvider('gitlab');

    await expect(
      useCase.perform(
        {
          owner: 'Jakub-Vacek',
          repo: 'empty-test',
          path: 'README.md',
          ref: 'master',
        },
        { provider }
      )
    ).resolves.toEqual(
      ok({
        content: expect.any(String),
        encoding: 'base64',
        size: expect.any(Number),
      })
    );
  });
});
