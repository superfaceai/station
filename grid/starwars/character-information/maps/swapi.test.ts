import { SuperfaceTest } from '@superfaceai/testing';
import { nockConfig } from '../../../test-config';

describe('starwars/character-information/swapi', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'starwars/character-information',
        provider: 'swapi',
      },
      nockConfig
    );
  });

  it('should perform successfully', async () => {
    await expect(
      superface.run({
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
        useCase: 'RetrieveCharacterInformation',
        input: {
          characterName: 'Duke',
        },
      })
    ).resolves.toMatchSnapshot();
  });
});
