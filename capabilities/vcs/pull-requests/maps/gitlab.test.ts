import { ok, SuperfaceClient } from '@superfaceai/sdk';

describe('vcs/pull-requests/gitlab', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-requests');
    const useCase = profile.getUseCase('pullRequests');
    const provider = await client.getProvider('gitlab');
    await expect(useCase.perform({ owner: 'Jakub-Vacek', repo: 'empty-test' }, { provider })).resolves.toEqual(ok({
      repos: [{
        id: 1,
        sha: "8c64ce23d626c5bf345ce90fa5af329569d62c9a",
        title: "Update README.md",
        url: "https://gitlab.com/Jakub-Vacek/empty-test/-/merge_requests/1",
      }]
    }))
  });
});
