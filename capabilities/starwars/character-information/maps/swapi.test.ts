import { SuperfaceClient } from '../../../../superface/sdk';

describe('starwars/character-information/swapi', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('starwars/character-information');
    const useCase = profile.useCases.RetrieveCharacterInformation;
    const provider = await client.getProvider('swapi');

    expect(useCase).not.toBeUndefined();
    expect(provider).not.toBeUndefined();
    const result = await useCase.perform(
      {
        characterName: 'Luke Skywalker',
      },
      { provider }
    );
    expect(result.unwrap()).toEqual({
      height: '172',
      weight: '77',
      yearOfBirth: '19BBY',
    });
  });
});
