import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('vcs/pull-requests/gitlab', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-requests');
    const useCase = profile.getUseCase('PullRequests');
    const provider = await client.getProvider('gitlab');
    const result = await useCase.perform(
      { owner: 'Jakub-Vacek', repo: 'empty-test' },
      { provider }
    );
    const value = result.unwrap();

    expect(value).toEqual({
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
