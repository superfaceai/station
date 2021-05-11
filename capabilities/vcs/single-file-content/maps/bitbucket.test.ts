import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('vcs/single-file-content/bitbucket', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/single-file-content');
    const useCase = profile.getUseCase('SingleFileContent');
    const provider = await client.getProvider('bitbucket');
    const result = await useCase.perform(
      {
        owner: 'jakuvacek',
        repo: 'testrepository',
        path: 'README.md',
        ref: 'master',
      },
      { provider }
    );
    const value = result.unwrap();

    expect(value).toEqual({
      content: expect.stringContaining('README'),
      encoding: 'utf-8',
      size: expect.any(Number),
    });
  }, 10000);
});
