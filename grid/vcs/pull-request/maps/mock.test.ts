import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('vcs/pull-request/mock-typed', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-request');
    const provider = await client.getProvider('mock');
    const usecase = profile.getUseCase('PullRequest');

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const owner = 'test';
    const repo = 'empty';
    const identifier = 1;
    const result = await usecase.perform(
      { owner, repo, identifier },
      { provider }
    );
    expect(result.unwrap()).toEqual({
      id: identifier,
      sha: expect.any(String),
      title: expect.any(String),
      url: `https://gitlab.com/${owner}/${repo}/-/merge_requests/${identifier}`,
    });
  });
});
