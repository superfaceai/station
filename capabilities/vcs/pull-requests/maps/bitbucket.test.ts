import { ok, SuperfaceClient } from '@superfaceai/sdk';

describe('vcs/pull-requests/bitbucket', () => {
    it('performs correctly', async () => {
        const client = new SuperfaceClient;
        const profile = await client.getProfile('vcs/pull-requests');
        const useCase = profile.getUseCase('pullRequests');
        const provider = await client.getProvider('bitbucket');

        await expect(useCase.perform({ owner: 'jakuvacek', repo: 'testrepository' }, { provider }))
            .resolves.toEqual(ok({ repos: [{ id: 1, sha: 'd1d6bab92584', title: 'README.md edited online with Bitbucket', url: 'https://bitbucket.org/jakuvacek/testrepository/pull-requests/1' }] }))

    })
})
