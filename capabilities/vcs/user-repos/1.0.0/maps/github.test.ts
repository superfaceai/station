import { SuperfaceClient } from '../superface/sdk';

describe('vcs/user-repos/github-typed', () => {
  //Load super.json for tested usecase
  beforeAll(async () => {
    process.env.SUPERFACE_PATH =
      './capabilities/vcs/user-repos/1.0.0/superface/super.json';
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/user-repos');
    const provider = await client.getProvider('github');
    const result = await profile.useCases.UserRepos.perform(
      { user: 'jakub-vacek' },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(result.unwrap()).toEqual({
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
