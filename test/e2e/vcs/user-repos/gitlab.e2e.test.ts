import { SuperfaceClient } from './superface/sdk';

describe('vcs/user-repos/gitlab-e2e', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    //Load super.json for tested usecase
    process.env.SUPERFACE_PATH =
      './test/e2e/vcs/user-repos/superface/super.json';
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
