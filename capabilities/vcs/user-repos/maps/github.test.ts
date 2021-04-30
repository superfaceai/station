import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('vcs/user-repos/github', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/user-repos');
    const useCase = profile.getUseCase('UserRepos');
    const provider = await client.getProvider('github');
    const result = await useCase.perform({ user: 'jakub-vacek' }, { provider });
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
