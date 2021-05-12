import { SuperfaceClient } from './superface/sdk';

describe('vcs/user-repos/github-e2e', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    //Load super.json for tested usecase
    process.env.SUPERFACE_PATH = './superface/super.json';
  })

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/user-repos');
    const provider = await client.getProvider('github');
    const usecase = profile.useCases.GetUserRepos;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform({ user: 'jakub-vacek' }, { provider });
    const value = result.unwrap();

    expect(value).toEqual({
      repos: [
        { name: 'BcAppClient', description: 'Client for BcAppServer' },
        { name: 'BcAppServer', description: null },
        {
          name: 'docucheck',
          description: "Tool for validating Wultra's documentation ",
        },
        { name: 'ICT', description: 'ICT Node.js project' },
        { name: 'JenkinsTest', description: 'Test repo for Jenkins' },
        { name: 'linterTest', description: null },
        { name: 'MonitorService', description: null },
        {
          name: 'standard-readme',
          description: 'A standard style for README files',
        },
      ],
    });
  });
});
