import { SuperfaceClient } from '../../../../superface/sdk';

describe('vcs/single-file-content/gitlab-typed', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/single-file-content');
    const provider = await client.getProvider('gitlab');
    const result = await profile.useCases.SingleFileContent.perform(
      {
        owner: 'Jakub-Vacek',
        repo: 'empty-test',
        path: 'README.md',
        ref: 'master',
      },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual({
      content: expect.any(String),
      encoding: 'base64',
      size: expect.any(Number),
    });
  });
});
