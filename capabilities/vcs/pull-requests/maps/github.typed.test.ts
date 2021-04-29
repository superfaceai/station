import { SuperfaceClient } from '../../../../superface/sdk';

describe('vcs/pull-requests/github-typed', () => {
  it('sends a message', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-requests');
    const provider = await client.getProvider('github');
    const result = await profile.useCases.PullRequests.perform(
      { owner: 'superfaceai', repo: 'astexplorer' },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual({
      repos: [
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
