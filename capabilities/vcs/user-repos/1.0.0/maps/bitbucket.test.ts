import { SuperfaceClient } from '../superface/sdk';

describe('vcs/user-repos/bitbucket-typed', () => {
  //Load super.json for tested usecase
  beforeAll(async () => {
    process.env.SUPERFACE_PATH =
      './capabilities/vcs/user-repos/1.0.0/superface/super.json';
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/user-repos');
    const provider = await client.getProvider('bitbucket');
    const result = await profile.useCases.UserRepos.perform({}, { provider });

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual({
      repos: [
        { name: 'testRepository', description: '' },
        { name: 'Private', description: '' },
        { name: 'dx-scanner', description: '' },
      ],
    });
  });
});
