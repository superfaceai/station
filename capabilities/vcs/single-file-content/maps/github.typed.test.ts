import { SuperfaceClient } from '../../../../superface/sdk';

describe('vcs/single-file-content/github-typed', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/single-file-content');
    const provider = await client.getProvider('github');
    const result = await profile.useCases.SingleFileContent.perform(
      { owner: 'superfaceai', repo: 'astexplorer', path: 'README.md' },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual({
      content: expect.any(String),
      encoding: 'base64',
      size: expect.any(Number),
    });
  }, 10000);
});
