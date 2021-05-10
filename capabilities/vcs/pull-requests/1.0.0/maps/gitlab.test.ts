import { SuperfaceClient } from '../superface/sdk';

describe('vcs/pull-requests/1.0.0/gitlab-typed', () => {
  //Load super.json for tested usecase
  beforeAll(async () => {
    process.env.SUPERFACE_PATH =
      './capabilities/vcs/pull-requests/1.0.0/superface/super.json';
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-requests');
    const provider = await client.getProvider('gitlab');
    const result = await profile.useCases.PullRequests.perform(
      { owner: 'Jakub-Vacek', repo: 'empty-test' },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual({
      pullRequests: [
        {
          id: 1,
          sha: '8c64ce23d626c5bf345ce90fa5af329569d62c9a',
          title: 'Update README.md',
          url: 'https://gitlab.com/Jakub-Vacek/empty-test/-/merge_requests/1',
        },
      ],
    });
  });
});
