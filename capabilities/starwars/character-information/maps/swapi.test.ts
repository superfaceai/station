import { SuperfaceClient } from '../../../../superface/sdk';

describe('starwars/character-information/swapi', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('starwars/character-information');
    const useCase = profile.useCases.RetrieveCharacterInformation;
    const provider = await client.getProvider('swapi');

    expect(useCase).not.toBeUndefined();
    expect(provider).not.toBeUndefined();
    const result = await useCase.perform({
      characterName: "Luke Skywalker"
    });
    expect(result.unwrap()).toEqual({
      height: "172",
      name: "Luke Skywalker",
      weight: "77",
      yearOfBirth: "19BBY",
    });
  })
})
