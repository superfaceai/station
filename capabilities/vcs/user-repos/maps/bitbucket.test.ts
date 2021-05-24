import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('vcs/user-repos/bitbucket', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/user-repos');
    const useCase = profile.getUseCase('UserRepos');
    const provider = await client.getProvider('bitbucket');
    const result = await useCase.perform({ user: 'jakuvacek' }, { provider });
    const value = result.unwrap();

    expect(value).toEqual({
      repos: [{ name: 'testRepository', description: undefined }],
    });
  });
});
