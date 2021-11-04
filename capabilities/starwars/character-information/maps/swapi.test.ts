import { SuperfaceTest } from '@superfaceai/testing-lib';

describe('starwars/character-information/swapi', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  it('should perform successfully', async () => {
    await expect(
      superface.run({
        profile: 'starwars/character-information',
        provider: 'swapi',
        useCase: 'RetrieveCharacterInformation',
        input: {
          characterName: 'Luke Skywalker',
        },
      })
    ).resolves.toMatchSnapshot();
  });

  it('should map error correctly when there are suggestions', async () => {
    await expect(
      superface.run({
        profile: 'starwars/character-information',
        provider: 'swapi',
        useCase: 'RetrieveCharacterInformation',
        input: {
          characterName: 'Luke',
        },
      })
    ).resolves.toMatchSnapshot();
  });

  it('should map error correctly when there are no characters found', async () => {
    await expect(
      superface.run({
        profile: 'starwars/character-information',
        provider: 'swapi',
        useCase: 'RetrieveCharacterInformation',
        input: {
          characterName: 'Duke',
        },
      })
    ).resolves.toMatchSnapshot();
  });
});
