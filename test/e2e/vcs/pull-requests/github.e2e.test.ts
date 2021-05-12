import { SuperfaceClient } from './superface/sdk';

describe('vcs/pull-requests/github-e2e', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    //Load super.json for tested usecase
    process.env.SUPERFACE_PATH = './superface/super.json';
  })

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-requests');
    const provider = await client.getProvider('github');
    const usecase = profile.useCases.PullRequests;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform(
      { owner: 'superfaceai', repo: 'astexplorer' },
      { provider }
    );
    const value = result.unwrap();

    expect(value).toEqual({
      pullRequests: [
        {
          id: 567476468,
          sha: 'a8e318f2f5f14504a2f0da049d26cbc80d35fa9d',
          title: 'chore: Bump parser version',
          url: 'https://api.github.com/repos/superfaceai/astexplorer/pulls/3',
        },
      ],
    });
  });
});
