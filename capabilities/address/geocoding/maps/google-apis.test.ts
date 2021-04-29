
import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('address/geocoding/google-apis', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/geocoding');
    const useCase = profile.getUseCase('geocoding');
    const provider = await client.getProvider('google-apis');

    expect(useCase).not.toBeUndefined();
    expect(provider).not.toBeUndefined();
    //Edit expected value
    //await expect(useCase.perform({}, { provider })).resolves.toEqual()
  })
})
