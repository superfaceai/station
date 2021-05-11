import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('vcs/user-repos/gitlab', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/user-repos');
    const useCase = profile.getUseCase('UserRepos');
    const provider = await client.getProvider('gitlab');
    const result = await useCase.perform({ user: 'zdne' }, { provider });
    const value = result.unwrap();

    expect(value).toEqual({
      repos: [{ name: 'test', description: 'Hello World!' }],
    });
  }, 10000);
});
