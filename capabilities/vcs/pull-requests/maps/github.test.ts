import { ok, SuperfaceClient } from '@superfaceai/sdk';

describe('vcs/pull-requests/github', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-requests');
    const useCase = profile.getUseCase('pullRequests');
    const provider = await client.getProvider('github');

    await expect(
      useCase.perform(
        { owner: 'superfaceai', repo: 'astexplorer' },
        { provider }
      )
    ).resolves.toEqual(
      ok({
        repos: [
          {
            id: 567476468,
            sha: 'a8e318f2f5f14504a2f0da049d26cbc80d35fa9d',
            title: 'chore: Bump parser version',
            url: 'https://api.github.com/repos/superfaceai/astexplorer/pulls/3',
          },
        ],
      })
    );
  });
});
