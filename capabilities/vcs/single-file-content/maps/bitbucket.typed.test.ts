import { SuperfaceClient } from '../../../../superface/sdk';

describe('vcs/single-file-content/bitbucket-typed', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/single-file-content');
    const provider = await client.getProvider('bitbucket');
    const result = await profile.useCases.SingleFileContent.perform(
      {
        owner: 'jakuvacek',
        repo: 'testrepository',
        path: 'README.md',
        ref: 'master',
      },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual({
      content: expect.stringContaining('README'),
      encoding: 'utf-8',
      size: expect.any(Number),
    });
  });
});
