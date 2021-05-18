import { SuperfaceClient } from './superface/sdk';

describe('vcs/single-file-content/github-e2e', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    //Load super.json for tested usecase
    process.env.SUPERFACE_PATH =
      './test/e2e/vcs/single-file-content/superface/super.json';
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/single-file-content');
    const provider = await client.getProvider('github');
    const result = await profile.useCases.SingleFileContent.perform(
      {
        owner: 'superfaceai',
        repo: 'astexplorer',
        path: 'README.md',
        ref: 'master',
      },
      { provider }
    );

    // expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual({
      content: expect.any(String),
      encoding: 'base64',
      size: expect.any(Number),
    });
  });
});
