import { ok, SuperfaceClient } from '@superfaceai/sdk';

describe('vcs/user-repos/bitbucket', () => {
    it('performs correctly', async () => {
        const client = new SuperfaceClient;
        const profile = await client.getProfile('vcs/user-repos');
        const useCase = profile.getUseCase('userRepos');
        const provider = await client.getProvider('bitbucket');

        await expect(useCase.perform({}, { provider })).resolves.toEqual(ok({
            repos: [
                { name: 'testRepository', description: '' },
                { name: 'Private', description: '' },
                { name: 'dx-scanner', description: '' }
            ]
        }))
    })
})
