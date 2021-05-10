import { SuperfaceClient } from '../../../../superface/sdk';

describe('compute/instances/digitalocean-typed', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('compute/instances');
    const provider = await client.getProvider('digitalocean');
    const usecase = profile.useCases.Instances;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    //Edit input values and expected result
    //const result = await usecase.perform({}, { provider });
    //expect(result.unwrap()).toEqual();
  });
});