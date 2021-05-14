import { SuperfaceClient } from './superface/sdk';

describe('vcs/pull-requests/bitbucket-e2e', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    //Load super.json for tested usecase
    process.env.SUPERFACE_PATH = './test/e2e/vcs/pull-requests/superface/super.json';
  })

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-requests');
    const provider = await client.getProvider('bitbucket');
    const result = await profile.useCases.PullRequests.perform(
      { owner: 'jakuvacek', repo: 'testrepository' },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual({
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
