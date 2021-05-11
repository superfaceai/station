import { SuperfaceClient } from '../../../../superface/sdk';

describe('vcs/pull-requests/mock-typed', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-requests');
    const provider = await client.getProvider('mock');
    const usecase = profile.useCases.PullRequests;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const owner = 'test';
    const repo = 'empty';
    const result = await usecase.perform({ owner, repo }, { provider });
    expect(result.unwrap()).toEqual({
      pullRequests: [
        {
          id: expect.any(Number),
          sha: expect.any(String),
          title: expect.any(String),
          url: expect.stringContaining(
            `https://gitlab.com/${owner}/${repo}/-/merge_requests/`
          ),
        },
      ],
    });
  }, 10000);
});
