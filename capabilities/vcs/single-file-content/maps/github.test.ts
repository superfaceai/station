import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('vcs/single-file-content/github', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/single-file-content');
    const useCase = profile.getUseCase('singleFileContent');
    const provider = await client.getProvider('github');
    const result = await useCase.perform(
      { owner: 'superfaceai', repo: 'astexplorer', path: 'README.md' },
      { provider }
    );
    const value = result.unwrap();

    expect(value).toEqual({
      content: expect.any(String),
      encoding: 'base64',
      size: expect.any(Number),
    });
  });
});
