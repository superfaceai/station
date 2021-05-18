import { SuperfaceClient } from './superface/sdk';

describe('vcs/pull-request/bitbucket-e2e', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    //Load super.json for tested usecase
    process.env.SUPERFACE_PATH =
      './test/e2e/vcs/pull-request/superface/super.json';
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-request');
    const provider = await client.getProvider('bitbucket');
    const usecase = profile.useCases.PullRequest;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform(
      { owner: 'jakuvacek', repo: 'testrepository', identifier: 1 },
      { provider }
    );
    expect(result.unwrap()).toEqual({
      id: 1,
      sha: 'd1d6bab92584',
      title: 'README.md edited online with Bitbucket',
      url: 'https://bitbucket.org/jakuvacek/testrepository/pull-requests/1',
    });
  });
});
