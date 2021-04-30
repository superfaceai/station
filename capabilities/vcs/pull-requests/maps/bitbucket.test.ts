import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('vcs/pull-requests/bitbucket', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-requests');
    const useCase = profile.getUseCase('PullRequests');
    const provider = await client.getProvider('bitbucket');
    const result = await useCase.perform(
      { owner: 'jakuvacek', repo: 'testrepository' },
      { provider }
    );
    const value = result.unwrap();
    expect(value).toEqual({
      pullRequests: [
        {
          id: 1,
          sha: 'd1d6bab92584',
          title: 'README.md edited online with Bitbucket',
          url: 'https://bitbucket.org/jakuvacek/testrepository/pull-requests/1',
        },
      ],
    });
  });
});
