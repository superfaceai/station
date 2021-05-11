import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('vcs/single-file-content/gitlab', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/single-file-content');
    const useCase = profile.getUseCase('SingleFileContent');
    const provider = await client.getProvider('gitlab');
    const result = await useCase.perform(
      {
        owner: 'Jakub-Vacek',
        repo: 'empty-test',
        path: 'README.md',
        ref: 'master',
      },
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
