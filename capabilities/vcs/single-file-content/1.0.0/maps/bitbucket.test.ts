import { SuperfaceClient } from '../superface/sdk';

describe('vcs/single-file-content/1.0.0/bitbucket-typed', () => {
  //Load super.json for tested usecase
  beforeAll(async () => {
    process.env.SUPERFACE_PATH =
      './capabilities/vcs/single-file-content/1.0.0/superface/super.json';
  });

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
