import { SuperfaceClient } from '../../../../superface/sdk';

describe('vcs/user-repos/bitbucket-typed', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/user-repos');
    const provider = await client.getProvider('bitbucket');
    const result = await profile.useCases.UserRepos.perform({}, { provider });

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual({
      repos: [
        { name: 'testRepository', description: undefined },
        { name: 'Private', description: undefined },
        { name: 'dx-scanner', description: undefined },
        { name: 'empty', description: undefined },
      ],
    });
  });
});
