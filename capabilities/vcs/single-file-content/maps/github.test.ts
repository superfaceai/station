import { ok, SuperfaceClient } from '@superfaceai/sdk';

describe('vcs/single-file-content/github', () => {
    it('performs correctly', async () => {
        const client = new SuperfaceClient;
        const profile = await client.getProfile('vcs/single-file-content');
        const useCase = profile.getUseCase('singleFileContent');
        const provider = await client.getProvider('github');

        await expect(useCase.perform({ owner: 'superfaceai', repo: 'astexplorer', path: 'README.md' }, { provider })).resolves.toEqual(ok({ content: expect.any(String), encoding: 'base64', size: expect.any(Number) }))
    })
})
