import { SuperfaceClient } from '../superface/sdk';

describe('vcs/pull-request/1.0.0/github-typed', () => {
  //Load super.json for tested usecase
  beforeAll(async () => {
    process.env.SUPERFACE_PATH =
      './capabilities/vcs/pull-request/1.0.0/superface/super.json';
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-request');
    const provider = await client.getProvider('github');
    const usecase = profile.useCases.PullRequest;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    //Edit input values and expected result
    const result = await usecase.perform(
      { owner: 'superfaceai', repo: 'astexplorer', identifier: 3 },
      { provider }
    );
    expect(result.unwrap()).toEqual({
      id: 567476468,
      sha: 'a8e318f2f5f14504a2f0da049d26cbc80d35fa9d',
      title: 'chore: Bump parser version',
      url: 'https://api.github.com/repos/superfaceai/astexplorer/pulls/3',
    });
  });
});
