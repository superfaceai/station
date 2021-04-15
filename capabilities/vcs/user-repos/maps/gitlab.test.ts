import { ok, SuperfaceClient } from '@superfaceai/sdk';

describe('vcs/user-repos/gitlab', () => {
    it('performs correctly', async () => {
        const client = new SuperfaceClient;
        const profile = await client.getProfile('vcs/user-repos');
        const useCase = profile.getUseCase('userRepos');
        const provider = await client.getProvider('gitlab');
        await expect(
            useCase.perform({ user: 'zdne' }, { provider })
        ).resolves.toEqual(
            ok({
                repos: [{ name: 'test', description: 'Hello World!' }]
            })
        );
    })
})
