import { SuperfaceClient } from '../superface/sdk';

describe('vcs/user-repos/github-typed', () => {
  //Load super.json for tested usecase
  beforeAll(async () => {
    process.env.SUPERFACE_PATH =
      './capabilities/vcs/user-repos/1.0.0/superface/super.json';
  });
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/user-repos');
    const provider = await client.getProvider('gitlab');
    const result = await profile.useCases.UserRepos.perform(
      { user: 'zdne' },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual({
      repos: [{ name: 'test', description: 'Hello World!' }],
    });
  });
});
