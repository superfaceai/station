import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('vcs/user-repos/bitbucket', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/user-repos');
    const useCase = profile.getUseCase('UserRepos');
    const provider = await client.getProvider('bitbucket');
    const result = await useCase.perform({}, { provider });
    const value = result.unwrap();

    expect(value).toEqual({
      repos: [
        { name: 'testRepository', description: '' },
        { name: 'Private', description: '' },
        { name: 'dx-scanner', description: '' },
      ],
    });
  }, 10000);
});
