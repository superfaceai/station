import { SuperfaceClient } from '@superfaceai/sdk';

describe('vcs/pull-requests/gitlab', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('vcs/pull-requests');
    const useCase = profile.getUseCase('pullRrequests');
    const provider = await client.getProvider('gitlab');

    expect(useCase).not.toBeUndefined();
    expect(provider).not.toBeUndefined();
    //Edit expected value
    //await expect(useCase.perform({}, { provider })).resolves.toEqual()
  });
});
