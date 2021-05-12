import { SuperfaceClient } from '../../../../superface/sdk';

describe('vcs/single-file-content/mock-typed', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/single-file-content');
    const provider = await client.getProvider('mock');
    const usecase = profile.useCases.SingleFileContent;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();
    const result = await profile.useCases.SingleFileContent.perform(
      {
        owner: 'test',
        repo: 'test',
        path: 'test',
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
