import { SuperfaceClient } from './superface/sdk';

describe('vcs/user-repos/bitbucket-e2e', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    //Load super.json for tested usecase
    process.env.SUPERFACE_PATH = './test/e2e/vcs/user-repos/superface/super.json';
  })

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/user-repos');
    const provider = await client.getProvider('bitbucket');
    const result = await profile.useCases.GetUserRepos.perform({}, { provider });

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
