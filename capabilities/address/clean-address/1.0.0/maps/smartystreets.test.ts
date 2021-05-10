import { SuperfaceClient } from '../superface/sdk';

describe('address/clean-address/1.0.0/smartystreets-typed', () => {
  //Load super.json for tested usecase
  beforeAll(async () => {
    process.env.SUPERFACE_PATH =
      './capabilities/address/clean-address/1.0.0/superface/super.json';
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('address/clean-address');
    const provider = await client.getProvider('smartystreets');
    const useCase = profile.useCases.CleanAddress;

    expect(provider).not.toBeUndefined();
    expect(useCase).not.toBeUndefined();

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
