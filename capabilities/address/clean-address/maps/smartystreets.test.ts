import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('address/clean-address/smartystreets', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/clean-address');
    const useCase = profile.getUseCase('CleanAddress');
    const provider = await client.getProvider('smartystreets');
    expect(useCase).not.toBeUndefined();
    expect(provider).not.toBeUndefined();
    const result = await useCase.perform({
      street: '3301 South Greenfield Road',
      city: 'Gilbert',
      state: 'AZ',
      zipcode: '85297',
    });
    expect(result.unwrap()).toEqual({
      city: 'Gilbert',
      state: 'AZ',
      street: '3301 S Greenfield Rd',
      zipcode: '85297',
    });
  });
});
