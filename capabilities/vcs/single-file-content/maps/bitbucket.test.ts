import { ok, SuperfaceClient } from '@superfaceai/sdk';

describe('vcs/single-file-content/bitbucket', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/single-file-content');
    const useCase = profile.getUseCase('singleFileContent');
    const provider = await client.getProvider('bitbucket');

    await expect(
      useCase.perform(
        {
          owner: 'jakuvacek',
          repo: 'testrepository',
          path: 'README.md',
          ref: 'master',
        },
        { provider }
      )
    ).resolves.toEqual(
      ok({
        content: expect.stringContaining('README'),
        encoding: 'utf-8',
        size: expect.any(Number),
      })
    );
  });
});
