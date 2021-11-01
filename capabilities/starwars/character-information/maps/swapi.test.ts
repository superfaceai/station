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

  it('should map error correctly', async () => {
    await expect(
      superface.run({
        profile: 'starwars/character-information',
        provider: 'swapi',
        useCase: 'RetrieveCharacterInformation',
        input: {
          characterName: 'madeUp',
        },
      })
    ).resolves.toMatchSnapshot();
  });
});
